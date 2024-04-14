from django.db import models
from django.db.models import QuerySet
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from api.serializers.chat_serializers import ChatPeopleRequestSerializer, ChatPeopleResponseSerializer
from api.api_models.chat_models import ChatPeopleRequest, ChatPeopleResponse
from api.models import User, Chat

from django.core.exceptions import ValidationError
from django.core.validators import validate_email


class ChatPeopleView(APIView):
    def get(self, request: Request) -> Response:
        serializer = ChatPeopleRequestSerializer(data=request.data)
        if serializer.is_valid():
            people: ChatPeopleRequest = ChatPeopleRequest(**serializer.validated_data)
            user_mail_field = self.string_to_email(people.user_email)

            if user_mail_field is None:
                return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

            try:
                user = User.objects.get(email=user_mail_field)

                user_chats = Chat.objects.filter(models.Q(donor=user.id) | models.Q(receiver=user.id))

                chat_people_ids = set()
                for chat in user_chats:
                    if chat.donor == user.id:
                        chat_people_ids.add(chat.receiver)
                    else:
                        chat_people_ids.add(chat.donor)

                chat_people_info: list[ChatPeopleResponse] = []
                for person_id in chat_people_ids:
                    current_person = User.objects.get(id=person_id)
                    chat_people_info.append(ChatPeopleResponse.from_user(current_person))

                result_serializer = ChatPeopleResponseSerializer(chat_people_info, many=True)
                return Response(result_serializer.data, status=status.HTTP_200_OK)

            except User.DoesNotExist:
                return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def string_to_email(email_str):
        try:
            validate_email(email_str)
            return email_str
        except ValidationError:
            return None


# class ChatMessagesView(APIView):
#     def get(self, request: Request) -> Response:
#         serializer = FilterUsersRequestSerializer(data=request.data)
#         if serializer.is_valid():
#             search: FilterUsersRequest = FilterUsersRequest(**serializer.validated_data)
#             blood_types = self._blood_types(search)
#             queryset: QuerySet = User.objects.annotate(
#                 fn_sf=Lower(Concat(
#                     'first_name', Value(' '), 'last_name', output_field=CharField())),
#                 fn_sl=Lower(Concat(
#                     'last_name', Value(' '), 'first_name', output_field=CharField()))
#             ).filter(
#                 (Q(fn_sf__icontains=search.name.lower()) | Q(fn_sl__icontains=search.name.lower()))
#                 & Q(blood_type__in=blood_types)
#             )
#             mapped: list[UserResponse] = [UserResponse.from_user(user) for user in list(queryset)]
#             result_serializer = UserResponseSerializer(mapped, many=True)
#             return Response(result_serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     @staticmethod
#     def _blood_types(search: FilterUsersRequest) -> list[UUID]:
#         if search.blood_id is not None:
#             return [search.blood_id]
#         else:
#             return all_blood_types()
