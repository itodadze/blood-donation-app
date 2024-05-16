from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.api_models.request_models import ReceiverRequestId
from api.models import ReceiverRequest
from api.serializers.request_serializers import ReceiverRequestIdSerializer
from api.serializers.search_serializers import SearchSerializer


class ReceiverRequestView(APIView):
    def get(self, request: Request) -> Response:
        identifier = request.query_params.get("request_id")
        try:
            result = ReceiverRequest.objects.get(pk=identifier)
            return Response(SearchSerializer(result).data, status=status.HTTP_200_OK)
        except ReceiverRequest.DoesNotExist:
            return Response("Invalid receiver request", status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request) -> Response:
        serializer = ReceiverRequestIdSerializer(data=request.data)

        if serializer.is_valid():
            receiver_request: ReceiverRequestId = ReceiverRequestId(**serializer.validated_data)
            ReceiverRequest.objects.filter(pk=receiver_request.id).delete()
            return Response(None, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
