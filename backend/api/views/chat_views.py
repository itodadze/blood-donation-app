from datetime import datetime

from django.db import models
from django.db.models import Q
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from api.serializers.chat_serializers import ChatPeopleRequestSerializer, ChatPeopleResponseSerializer, \
    ChatMessagesRequestSerializer, ChatMessagesResponseSerializer, ChatNewMessageRequestSerializer, \
    ConversationCreateRequestSerializer, ConversationResponseSerializer
from api.api_models.chat_models import (ChatPeopleRequest, ChatPeopleResponse, ChatMessagesRequest, ChatMessageResponse,
                                        ChatNewMessageRequest, ConversationCreateRequest, ConversationResponse)
from api.models import User, Chat, Message


class ChatPeopleView(APIView):
    def get(self, request: Request) -> Response:
        serializer = ChatPeopleRequestSerializer(data=request.query_params)
        if serializer.is_valid():
            people: ChatPeopleRequest = ChatPeopleRequest(**serializer.validated_data)
            user_id = people.user_id

            try:
                user = User.objects.get(id=user_id)

                user_chats = Chat.objects.filter(models.Q(donor=user.id) | models.Q(receiver=user.id))

                chat_people_ids = set()
                for chat in user_chats:
                    if chat.donor.id == user.id:
                        chat_people_ids.add(chat.receiver.id)
                    else:
                        chat_people_ids.add(chat.donor.id)

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


class ChatMessagesView(APIView):
    def get(self, request: Request) -> Response:
        serializer = ChatMessagesRequestSerializer(data=request.query_params)

        if serializer.is_valid():
            users_info: ChatMessagesRequest = ChatMessagesRequest(**serializer.validated_data)
            logged_in_user_id = users_info.logged_in_user_id
            chat_user_id = users_info.chat_user_id

            chat = Chat.objects.filter(
                Q(donor_id=logged_in_user_id, receiver_id=chat_user_id) |
                Q(donor_id=chat_user_id, receiver_id=logged_in_user_id)
            ).first()

            if chat is None:
                return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

            chat_id = chat.id
            messages = Message.objects.filter(chat_id=chat_id).order_by('message_timestamp')
            messages_list = list(messages)

            messages_response_info: list[ChatMessageResponse] = []
            for message_info in messages_list:
                new_message_response = ChatMessageResponse.from_message(message_info)
                messages_response_info.append(new_message_response)

            result_serializer = ChatMessagesResponseSerializer(messages_response_info, many=True)
            return Response(result_serializer.data, status=status.HTTP_200_OK)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChatNewMessageView(APIView):
    def post(self, request: Request) -> Response:
        serializer = ChatNewMessageRequestSerializer(data=request.data)

        if serializer.is_valid():
            new_message_info: ChatNewMessageRequest = ChatNewMessageRequest(**serializer.validated_data)
            sender_id = new_message_info.sender_id
            receiver_id = new_message_info.receiver_id
            message_text = new_message_info.message_text

            chat = Chat.objects.filter(
                Q(donor_id=sender_id, receiver_id=receiver_id) |
                Q(donor_id=receiver_id, receiver_id=sender_id)
            ).first()

            if chat is None:
                return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

            chat_id = chat.id
            new_message = Message.objects.create(
                chat_id=chat_id,
                sender_id=sender_id,
                message_text=message_text,
                message_status='Sent'
            )

            new_message.save()

            return Response(None, status=status.HTTP_200_OK)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConversationCreateView(APIView):
    def post(self, request: Request) -> Response:
        serializer = ConversationCreateRequestSerializer(data=request.data)

        if serializer.is_valid():
            conversation: ConversationCreateRequest = ConversationCreateRequest(**serializer.validated_data)
            try:
                chat = Chat.objects.get(
                    donor=conversation.donor_id,
                    receiver=conversation.receiver_id,
                )

                result = ConversationResponseSerializer(ConversationResponse.from_chat(chat))
                return Response(result.data, status=status.HTTP_200_OK)
            except Chat.DoesNotExist:
                chat = Chat.objects.create(
                    donor=conversation.donor_id,
                    receiver=conversation.receiver_id,
                    start_date=datetime.now(),
                    valid_status=True
                )

                result = ConversationResponseSerializer(ConversationResponse.from_chat(chat))
                return Response(result.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

