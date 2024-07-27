from django.core.files.storage.filesystem import FileSystemStorage
from django.http import FileResponse
from django.core.files.storage import default_storage
from rest_framework import status
from rest_framework.parsers import FileUploadParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import User, MedicalDocument
from api.serializers.document_serializers import MedicalDocumentSerializer


class MedicalDocumentsUploadView(APIView):
    parser_classes = (FileUploadParser,)

    def post(self, request: Request, identifier: int) -> Response:
        print(request.data)
        file = request.FILES["file"]
        try:
            user = User.objects.get(pk=identifier)
            fs = FileSystemStorage()
            filename = fs.save(str(user.pk) + "_" + file.name, file)
            with default_storage.open(filename, 'rb') as file:
                lines = file.readlines()
            if len(lines) > 4:
                lines = lines[4:]
            else:
                lines = []
            with default_storage.open(filename, 'wb') as file:
                file.writelines(lines)
            MedicalDocument.objects.create(
                user=user,
                file_address=filename,
                description=filename
            )
            return Response(None, status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            return Response("User not found", status=status.HTTP_400_BAD_REQUEST)


class MedicalDocumentsView(APIView):
    parser_classes = (FileUploadParser,)

    def get(self, request: Request) -> Response:
        try:
            user = User.objects.get(pk=request.query_params["id"])
            queryset = MedicalDocument.objects.filter(user=user)
            result_serializer = MedicalDocumentSerializer(queryset, many=True)
            return Response(result_serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response("User not found", status=status.HTTP_400_BAD_REQUEST)


class MedicalDocumentView(APIView):
    def get(self, request: Request) -> FileResponse:
        try:
            file = MedicalDocument.objects.get(pk=request.query_params["id"])
            fs = FileSystemStorage()
            if fs.exists(file.file_address):
                response = FileResponse(fs.open(file.file_address, 'rb'), content_type='application/octet-stream',
                                        as_attachment=True)
                response['Content-Disposition'] = f'attachment; filename="{file.description}"'
                response['Access-Control-Expose-Headers'] = 'Content-Disposition'
                return response
        except MedicalDocument.DoesNotExist:
            return FileResponse(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request: Request) -> Response:
        try:
            file = MedicalDocument.objects.get(pk=request.query_params["id"])
            fs = FileSystemStorage()
            fs.delete(file.description)
            MedicalDocument.objects.filter(pk=file.pk).delete()
            return Response(None, status=status.HTTP_204_NO_CONTENT)
        except MedicalDocument.DoesNotExist:
            return Response("Document could not be found", status=status.HTTP_404_NOT_FOUND)
