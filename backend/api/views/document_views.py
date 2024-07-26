from django.http import FileResponse
from rest_framework import status
from rest_framework.parsers import FileUploadParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import User, MedicalDocument
from api.serializers.document_serializers import MedicalDocumentSerializer


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

    def post(self, request: Request, format=None) -> Response:
        file = request.FILES["file"]
        try:
            user = User.objects.get(pk=request.data["id"])
            address = '/users/documents/' + str(user.pk) + "/" + file.name
            with open(address, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
            MedicalDocument.objects.create(
                user=user,
                file_address=address,
                description=file.name
            )
        except User.DoesNotExist:
            return Response("User not found", status=status.HTTP_400_BAD_REQUEST)


class MedicalDocumentView(APIView):
    def get(self, request: Request) -> FileResponse:
        try:
            file = MedicalDocument.objects.get(pk=request.query_params["id"])
            return FileResponse(open(file.file_address, 'rb'), filename=file.description, as_attachment=True)
        except MedicalDocument.DoesNotExist:
            return FileResponse(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request: Request) -> Response:
        try:
            file = MedicalDocument.objects.get(pk=request.query_params["id"])
            MedicalDocument.objects.filter(pk=file.pk).delete()
            return Response(None, status=status.HTTP_204_NO_CONTENT)
        except MedicalDocument.DoesNotExist:
            return Response("Document could not be found", status=status.HTTP_404_NOT_FOUND)
