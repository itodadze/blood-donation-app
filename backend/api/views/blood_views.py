from django.db.models import QuerySet
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models import BloodType
from api.serializers.blood_serializers import BloodSerializer


class BloodTypesView(APIView):
    def get(self, request: Request) -> Response:
        queryset: QuerySet = BloodType.objects.all()
        result_serializer = BloodSerializer(queryset, many=True)
        return Response(result_serializer.data, status=status.HTTP_200_OK)
