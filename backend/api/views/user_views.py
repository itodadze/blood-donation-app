from django.db.models import QuerySet
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.api_models.search_models import FilterRequest
from api.api_models.user_models import UserUpdateRequest
from api.core.blood_matcher import all_blood_types, all_donors
from api.models import BloodType, Chat, User, UserIcon
from api.serializers.user_serializers import UserSerializer, UserResponseSerializer, UserUpdateRequestSerializer


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


class UserView(APIView):
    def get(self, request: Request) -> Response:
        identifier = request.query_params.get("id")
        try:
            user = User.objects.get(pk=identifier)
            serializer = UserResponseSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response("User does not exist", status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request: Request) -> Response:
        serializer = UserUpdateRequestSerializer(data=request.data)
        if serializer.is_valid():
            updates: UserUpdateRequest = UserUpdateRequest(
                **serializer.validated_data
            )
            user: QuerySet = User.objects.filter(pk=updates.id)
            if updates.is_donor is not None:
                user.update(donor_status=updates.is_donor)
            if updates.email:
                user.update(email=updates.email)
            if updates.loc_longitude and updates.loc_latitude:
                user.update(loc_longitude=updates.loc_longitude, loc_latitude=updates.loc_latitude)
            if updates.first_name:
                user.update(first_name=updates.first_name)
            if updates.last_name:
                user.update(last_name=updates.last_name)
            if updates.description:
                user.update(description=updates.description)
            try:
                if updates.icon_id:
                    icon = UserIcon.objects.get(pk=updates.icon_id)
                    user.update(icon=icon)
            except UserIcon.DoesNotExist:
                return Response("Icon does not exist", status=status.HTTP_404_NOT_FOUND)
            try:
                if updates.blood_id:
                    blood = BloodType.objects.get(pk=updates.blood_id)
                    user.update(blood_type=blood)
            except BloodType.DoesNotExist:
                return Response("Blood type does not exist", status=status.HTTP_404_NOT_FOUND)
            return Response(None, status=status.HTTP_200_OK)
        else:
            return Response("Update request invalid", status=status.HTTP_400_BAD_REQUEST)
