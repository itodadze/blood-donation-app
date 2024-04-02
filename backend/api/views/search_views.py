from uuid import UUID

from django.db.models import QuerySet, Value, CharField, Q
from django.db.models.functions import Concat
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from api.api_models.search_models import FilterSearchRequest, FilterUsersRequest
from api.api_models.user_models import UserResponse
from api.core.blood_matcher import all_recipients
from api.models import ReceiverRequest, User
from api.serializers.search_serializers import FilterSearchRequestSerializer, SearchSerializer, \
    FilterUsersRequestSerializer
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
            queryset: QuerySet = User.objects.annotate(
                full_name_sf=Concat(
                    'first_name', Value(' '), 'last_name', output_field=CharField()),
                full_name_sl=Concat(
                    'last_name', Value(' '), 'first_name', output_field=CharField())
            ).filter(
                (Q(full_name_sf__startswith=search.name) | Q(full_name_sl__startswith=search.name))
                & Q(blood_type=search.blood_id)
            )
            mapped: list[UserResponse] = [UserResponse.from_user(user) for user in list(queryset)]
            result_serializer = UserResponseSerializer(mapped, many=True)
            return Response(result_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

