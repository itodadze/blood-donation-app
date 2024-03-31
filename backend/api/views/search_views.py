from uuid import UUID

from django.db.models import QuerySet
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from api.api_models.search_models import FilterSearchRequest
from api.core.blood_matcher import all_recipients
from api.models import Receiver_Request_Hist
from api.serializers.search_serializers import FilterSearchRequestSerializer, SearchSerializer


def blood_types(search: FilterSearchRequest) -> list[UUID]:
    if search.exact_match:
        return [search.blood_id]
    else:
        return all_recipients(search.blood_id)


class FilterSearchRequestsView(APIView):
    def get(self, request: Request) -> Response:
        serializer = FilterSearchRequestSerializer(data=request.data)
        if serializer.is_valid():
            search: FilterSearchRequest = FilterSearchRequest(**serializer.validated_data)
            recipient_blood_types = blood_types(search)
            queryset: QuerySet = (Receiver_Request_Hist.objects
                                  .filter(blood_type__in=recipient_blood_types,
                                          loc_latitude__range=(search.bottom_right_y, search.top_left_y),
                                          loc_longitude__range=(search.top_left_x, search.bottom_right_x)))
            result_serializer = SearchSerializer(queryset, many=True)
            return Response(result_serializer.data, status=status.HTTP_200_OK)
        else:
            Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
