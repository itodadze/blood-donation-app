from datetime import datetime

from django.core.mail import EmailMessage
from django.db.models import QuerySet
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.api_models.search_models import BroadcastSearchRequest, FilterRequest, FilterReceiverRequest
from api.core.blood_matcher import all_blood_types, all_donors, all_recipients
from api.core.donor_ranker import DonorPriorityRanker
from api.models import BloodType, ReceiverRequest, User
from api.serializers.search_serializers import (BroadcastSearchSerializer,
                                                SearchSerializer)

from backend import settings


class FilterSearchRequestsView(APIView):
    def get(self, request: Request) -> Response:
        search: FilterReceiverRequest = FilterReceiverRequest(request.query_params.get("id", None),
                                                              request.query_params["exact_match"] == "true",
                                                              request.query_params["current_author"] == "true")
        recipient_blood_types = self._blood_types(search)
        queryset: QuerySet = ReceiverRequest.objects.filter(
            blood_type__in=recipient_blood_types, search_status=True
        )
        if search.current_author:
            try:
                user: User = User.objects.get(pk=request.user.pk)
                queryset = queryset.filter(user_id=user.pk)
            except User.DoesNotExist:
                return Response("User does not exist", status=status.HTTP_404_NOT_FOUND)
        result_serializer = SearchSerializer(queryset, many=True)
        return Response(result_serializer.data, status=status.HTTP_200_OK)

    @staticmethod
    def _blood_types(search: FilterReceiverRequest) -> list[int]:
        if search.id:
            try:
                BloodType.objects.get(pk=search.id)
                if search.exact_match:
                    return [search.id]
                else:
                    return all_recipients(search.id)
            except BloodType.DoesNotExist:
                return all_blood_types()
        else:
            return all_blood_types()


class BroadcastSearchView(APIView):
    def post(self, request: Request) -> Response:
        serializer = BroadcastSearchSerializer(data=request.data)
        if serializer.is_valid():
            search: BroadcastSearchRequest = BroadcastSearchRequest(
                **serializer.validated_data
            )
            user: User = User.objects.get(pk=request.user.pk)
            blood_type: BloodType = BloodType.objects.get(pk=search.blood_id)
            receiver_request = ReceiverRequest.objects.create(
                user=user,
                blood_type=blood_type,
                description=search.description,
                search_status=True,
                emergency_status=search.emergency_status,
                loc_longitude=search.loc_longitude,
                loc_latitude=search.loc_latitude,
                request_date=datetime.now(),
            )
            blood_types = all_donors(blood_type.pk)
            users: list[User] = list(
                User.objects.filter(
                    blood_type__in=blood_types, donor_status=True
                ).exclude(pk=user.pk)
            )
            for i, user_to in enumerate(DonorPriorityRanker(search).rank(users)):
                if not search.emergency_status and i > 20:
                    break
                self.email(search, blood_type, user, user_to, receiver_request)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def email(
            self,
            search: BroadcastSearchRequest,
            blood: BloodType,
            user_from: User,
            user_to: User,
            request: ReceiverRequest,
    ) -> None:
        link_url = settings.REACT_APP_BASE_URL + "/request/" + str(request.id)
        email_body = (
                "სისხლი ესაჭიროება მომხმარებელს: "
                + user_from.first_name
                + " "
                + user_from.last_name
                + "-ს. \n"
                + "ეძებს დონორს სისხლისთვის: "
                + blood.narrative
                + ".\n"
                + "აღწერა: "
                + search.description
                + "\n"
                + "მოთხოვნის ლინკი: "
                + link_url
                + "\n"
        )
        email = EmailMessage(
            subject="სისხლის დონაცია", body=email_body, to=[user_to.email]
        )
        email.send()
