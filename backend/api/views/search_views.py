from datetime import datetime
from uuid import UUID

from django.core.mail import send_mail
from django.db.models import QuerySet, Value, CharField, Q
from django.db.models.functions import Concat, Lower
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from api.api_models.search_models import FilterSearchRequest, FilterUsersRequest, BroadcastSearchRequest
from api.api_models.user_models import UserResponse
from api.core.blood_matcher import all_recipients, all_blood_types, all_donors
from api.models import ReceiverRequest, User
from api.serializers.search_serializers import FilterSearchRequestSerializer, SearchSerializer, \
    FilterUsersRequestSerializer, BroadcastSearchSerializer
from api.serializers.user_serializers import UserResponseSerializer


class FilterSearchRequestsView(APIView):
    def get(self, request: Request) -> Response:
        serializer = FilterSearchRequestSerializer(data=request.data)
        if serializer.is_valid():
            search: FilterSearchRequest = FilterSearchRequest(**serializer.validated_data)
            recipient_blood_types = self._blood_types(search)
            queryset: QuerySet = ReceiverRequest.objects.filter(
                blood_type__in=recipient_blood_types,
                loc_latitude__range=(search.bottom_right_y, search.top_left_y),
                loc_longitude__range=(search.top_left_x, search.bottom_right_x),
                search_status=True
            )
            result_serializer = SearchSerializer(queryset, many=True)
            return Response(result_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def _blood_types(search: FilterSearchRequest) -> list[UUID]:
        if search.exact_match:
            return [search.blood_id]
        else:
            return all_recipients(search.blood_id)


class FilterUsersView(APIView):
    def get(self, request: Request) -> Response:
        serializer = FilterUsersRequestSerializer(data=request.data)
        if serializer.is_valid():
            search: FilterUsersRequest = FilterUsersRequest(**serializer.validated_data)
            blood_types = self._blood_types(search)
            queryset: QuerySet = User.objects.annotate(
                fn_sf=Lower(Concat(
                    'first_name', Value(' '), 'last_name', output_field=CharField())),
                fn_sl=Lower(Concat(
                    'last_name', Value(' '), 'first_name', output_field=CharField()))
            ).filter(
                (Q(fn_sf__icontains=search.name.lower()) | Q(fn_sl__icontains=search.name.lower()))
                & Q(blood_type__in=blood_types)
            )
            mapped: list[UserResponse] = [UserResponse.from_user(user) for user in list(queryset)]
            result_serializer = UserResponseSerializer(mapped, many=True)
            return Response(result_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def _blood_types(search: FilterUsersRequest) -> list[UUID]:
        if search.blood_id is not None:
            return [search.blood_id]
        else:
            return all_blood_types()


class BroadcastSearchView(APIView):
    def broadcast(self, request: Request) -> Response:
        serializer = BroadcastSearchSerializer(data=request.data)
        if serializer.is_valid():
            search: BroadcastSearchRequest = BroadcastSearchRequest(**serializer.validated_data)
            ReceiverRequest.objects.create(
                user=search.user_id, blood_type=search.blood_id, description=search.description,
                search_status=True, emergency_status=search.emergency_status,
                loc_longitude=search.loc_longitude, loc_latitude=search.loc_latitude,
                request_date=datetime.now()
            )
            blood_types = all_donors(search.blood_id)
            users: list[User] = list(User.objects.filter(
                blood_type__in=blood_types, donor_status=True
            ))
            self._order_users(search, users)
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

    @staticmethod
    def _order_users(search: BroadcastSearchRequest, users: list[User]) -> None:
        # currently only location is taken into account, later take into account
        # documents.
        users.sort(key=lambda x: pow(abs(search.loc_latitude - x.loc_latitude), 2) +
                                 pow(abs(search.loc_longitude - x.loc_longitude), 2))
