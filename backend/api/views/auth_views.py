from django.contrib.auth import login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_200_OK

from api.models import User
from api.serializers.auth_serializers import RegisterUserSerializer, LoginSerializer


class RegisterUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class LoginUser(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            return Response({"detail": "Login successful"}, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class Logout(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        logout(request)
        response = Response({"detail": "Logout successful"}, status=HTTP_200_OK)
        response.delete_cookie('sessionid')
        return response


@ensure_csrf_cookie
def csrf_token_view(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})
