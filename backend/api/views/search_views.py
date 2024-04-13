from datetime import datetime
from uuid import UUID

from django.db.models import QuerySet
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from api.api_models.search_models import BroadcastSearchRequest, FilterRequest
from api.core.blood_matcher import all_recipients, all_blood_types, all_donors
from api.core.donor_ranker import DonorPriorityRanker
from api.models import ReceiverRequest, User, BloodType
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
    def put(self, request: Request) -> Response:
        serializer = BroadcastSearchSerializer(data=request.data)
        if serializer.is_valid():
            search: BroadcastSearchRequest = BroadcastSearchRequest(**serializer.validated_data)
            user: User = User.objects.get(pk=search.user_id)
            blood_type: BloodType = BloodType.objects.get(pk=search.blood_id)
            ReceiverRequest.objects.create(
                user=user, blood_type=blood_type, description=search.description,
                search_status=True, emergency_status=search.emergency_status,
                loc_longitude=search.loc_longitude, loc_latitude=search.loc_latitude,
                request_date=datetime.now()
            )
            blood_types = all_donors(search.blood_id)
            users: list[User] = list(User.objects.filter(
                blood_type__in=blood_types, donor_status=True
            ).exclude(pk=search.blood_id))
            ranked_users = DonorPriorityRanker(search).rank(users)
            # send_mail(
            #    subject="სისხლის დონაცია",
            #    message="ჩატის ლინკი: ___, მიმღები: ___, სისხლის ჯგუფი: ___",
            #    from_email="გამგზავნის იმეილი",
            #    recipient_list= "პირველი დაახლ. 10 ავირჩიოთ, პერსონ. ლინკები გავუგზავნოთ",
            #    fail_silently=False
            # )
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
