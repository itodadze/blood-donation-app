from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.api_models.donation_models import DonationPost
from api.models import User, Donation
from api.serializers.donation_serializers import DonationPostSerializer


class DonationView(APIView):
    def post(self, request: Request) -> Response:
        serializer = DonationPostSerializer(data=request.data)

        if serializer.is_valid():
            donation = DonationPost(**serializer.validated_data)
            try:
                user = User.objects.get(pk=donation.donor)
                Donation.objects.create(donor=user)
                return Response(None, status=status.HTTP_201_CREATED)
            except User.DoesNotExist:
                return Response("Invalid user", status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)