from django.db.models import QuerySet
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.api_models.search_models import FilterRequest
from api.core.blood_matcher import all_blood_types, all_donors
from api.models import BloodType, Chat, User
from api.serializers.user_serializers import UserSerializer


class FilterDonorsView(APIView):
    def get(self, request: Request) -> Response:
        search: FilterRequest = FilterRequest(int(request.query_params["id"]),
                                              request.query_params["exact_match"] == "true")
        blood_types = self._blood_types(search)
        queryset: QuerySet = User.objects.filter(
            blood_type__in=blood_types, donor_status=True
        )
        result_serializer = UserSerializer(queryset, many=True)
        return Response(result_serializer.data, status=status.HTTP_200_OK)

    @staticmethod
    def _blood_types(search: FilterRequest) -> list[int]:
        try:
            curr_id = search.id
            if search.exact_match:
                return [curr_id]
            else:
                return all_donors(curr_id)
        except BloodType.DoesNotExist:
            return all_blood_types()


class ReceiverDonorUsersView(APIView):
    def get(self, request: Request) -> Response:
        identifier = request.query_params.get("id")
        try:
            user = User.objects.get(pk=identifier)
            chats = Chat.objects.filter(receiver=user).values("donor")
            serializer = UserSerializer(User.objects.filter(pk__in=chats), many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response("User does not exist", status=status.HTTP_400_BAD_REQUEST)
