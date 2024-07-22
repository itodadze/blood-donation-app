from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.api_models.icon_models import IconSet
from api.models import User, UserIcon
from api.serializers.icon_serializers import UserIconSerializer


class UserIconView(APIView):
    def get(self, request: Request) -> Response:
        return Response(UserIcon.objects.all(), status=status.HTTP_200_OK)


class SetUserIconView(APIView):
    def post(self, request: Request) -> Response:
        serializer = UserIconSerializer(data=request.data)

        if serializer.is_valid():
            set_icon = IconSet(**serializer.validated_data)
            try:
                User.objects.get(pk=set_icon.user_id)
                icon = UserIcon.objects.get(pk=set_icon.icon_id)

                User.objects.filter(pk=set_icon.user_id).update(icon=icon)
                return Response(None, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response("User not found", status=status.HTTP_404_NOT_FOUND)
            except UserIcon.DoesNotExist:
                return Response("No such icon found", status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
