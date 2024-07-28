from django.conf import settings
from django.contrib.auth import login, logout
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import (HTTP_200_OK, HTTP_201_CREATED,
                                   HTTP_400_BAD_REQUEST)
from rest_framework.views import APIView

from api.models import User
from api.serializers.auth_serializers import (LoginSerializer,
                                              RegisterUserSerializer)


class RegisterUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.save()
            user = User.objects.get(email=user_data["email"])
            user.is_active = False
            user.save()

            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            confirm_url = f"{settings.REACT_APP_BASE_URL}/confirm-email/{uid}/{token}/"

            email_body = (
                    "ლინკი: "
                    + confirm_url
                    + "\n"
            )
            send_mail("რეგისტრაციის დადასტურება", email_body, settings.DEFAULT_FROM_EMAIL, [user.email])
            return Response("Please check your mail", status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ConfirmEmail(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token, *args, **kwargs):
        try:
            uid = (urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            login(request, user)
            return Response({'detail': 'Email confirmed, you can now log in.'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid confirmation link.'}, status=status.HTTP_400_BAD_REQUEST)


class LoginUser(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            if not user.is_active:
                return Response("Please confirm email first", status=HTTP_400_BAD_REQUEST)
            login(request, user)
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class Logout(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)
        response = Response({"detail": "Logout successful"}, status=HTTP_200_OK)
        response.delete_cookie("sessionid")
        return response


@ensure_csrf_cookie
def csrf_token_view(request):
    csrf_token = get_token(request)
    return JsonResponse({"csrfToken": csrf_token})


def current_user_view(request):
    user = request.user
    response = {
        "pk": user.pk,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "donor": user.donor_status,
    }
    return JsonResponse(response)
