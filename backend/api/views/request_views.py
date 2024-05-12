from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.api_models.request_models import ReceiverRequestGet
from api.models import ReceiverRequest
from api.serializers.request_serializers import ReceiverRequestGetSerializer
from api.serializers.search_serializers import SearchSerializer


class ReceiverRequestView(APIView):
    def get(self, request: Request) -> Response:
        serializer = ReceiverRequestGetSerializer(data=request.data)

        if serializer.is_valid():
            receiver_request: ReceiverRequestGet = ReceiverRequestGet(**serializer.validated_data)

            try:
                result = ReceiverRequest.objects.get(pk=receiver_request.id)
                return Response(SearchSerializer(result).data, status=status.HTTP_200_OK)
            except ReceiverRequest.DoesNotExist:
                return Response("Invalid receiver request", status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
