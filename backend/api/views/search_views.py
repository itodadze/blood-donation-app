from datetime import datetime
from uuid import UUID

from django.core.mail import EmailMessage
from django.db.models import QuerySet
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from api.api_models.search_models import BroadcastSearchRequest, FilterRequest
from api.core.blood_matcher import all_recipients, all_blood_types, all_donors
from api.core.donor_ranker import DonorPriorityRanker
from api.models import ReceiverRequest, User, BloodType, ChatRequest
from api.serializers.search_serializers import (
    SearchSerializer, BroadcastSearchSerializer, FilterRequestSerializer)


class FilterSearchRequestsView(APIView):
    def post(self, request: Request) -> Response:
        serializer = FilterRequestSerializer(data=request.data)
        if serializer.is_valid():
            search: FilterRequest = FilterRequest(**serializer.validated_data)
            recipient_blood_types = self._blood_types(search)
            queryset: QuerySet = ReceiverRequest.objects.filter(
                blood_type__in=recipient_blood_types,
                search_status=True
            )
            result_serializer = SearchSerializer(queryset, many=True)
            return Response(result_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def _blood_types(search: FilterRequest) -> list[UUID]:
        try:
            curr_id = BloodType.objects.get(narrative=search.narrative).pk
            if search.exact_match:
                return [curr_id]
            else:
                return all_recipients(curr_id)
        except:
            return all_blood_types()


class BroadcastSearchView(APIView):
    def post(self, request: Request) -> Response:
        serializer = BroadcastSearchSerializer(data=request.data)
        if serializer.is_valid():
            search: BroadcastSearchRequest = BroadcastSearchRequest(**serializer.validated_data)
            user: User = User.objects.get(pk=search.user_id)
            blood_type: BloodType = BloodType.objects.get(narrative=search.narrative)
            ReceiverRequest.objects.create(
                user=user, blood_type=blood_type, description=search.description,
                search_status=True, emergency_status=search.emergency_status,
                loc_longitude=search.loc_longitude, loc_latitude=search.loc_latitude,
                request_date=datetime.now()
            )
            blood_types = all_donors(blood_type.pk)
            users: list[User] = list(User.objects.filter(
                blood_type__in=blood_types, donor_status=True
            ).exclude(pk=user.pk))
            for user_to in DonorPriorityRanker(search).rank(users):
                self.email(search, user, user_to)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def email(self, search: BroadcastSearchRequest, user_from: User, user_to: User) -> None:
        try:
            ChatRequest.objects.get(initiator=user_from, recipient=user_to)
        except Exception:
            ChatRequest.objects.create(
                initiator=user_from, recipient=user_to, accept_status=False
            )
        link_url = "http://localhost:3000/chats/" + str(user_from.pk) + "/" + str(user_to.pk)
        email_body = ('სისხლი ესაჭიროება მომხმარებელს: ' + user_from.first_name + ' '
                      + user_from.last_name + '-ს. \n' + 'ეძებს დონორს სისხლისთვის: '
                      + search.narrative + '.\n' + 'აღწერა: ' + search.description + '\n'
                      + 'მიმოწერის ლინკი: ' + link_url + '\n')
        email = EmailMessage(subject='სისხლის დონაცია',
                             body=email_body,
                             to=[user_to.email])
        email.send()
