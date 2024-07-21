from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import UserIcon


class UserIconView(APIView):
    def get(self, request: Request) -> Response:
        return Response(UserIcon.objects.all(), status=status.HTTP_200_OK)
