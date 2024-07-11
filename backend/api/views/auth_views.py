
from rest_framework import status, generics

from api.serializers.auth_serializers import RegisterUserSerializer
from api.api_models.auth_models import  RegisterUserRequest
from api.models import User
from rest_framework.permissions import AllowAny


class RegisterUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
    permission_classes = [AllowAny]
