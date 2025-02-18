from unittest.mock import ANY, MagicMock

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.response import Response
from test_filter_users import insert_default_user

from api.api_models.chat_models import (ChatMessageResponse,
                                        ChatMessagesRequest,
                                        ChatNewMessageRequest,
                                        ChatPeopleRequest, ChatPeopleResponse)
from api.models import BloodType, Chat, Message, User, UserIcon
from api.views.chat_views import (ChatMessagesView, ChatNewMessageView,
                                  ChatPeopleView)


class ChatTestCase(TestCase):
    def setUp(self) -> None:
        self.icon: UserIcon = UserIcon.objects.create(file_address="path/to/icon")
        self.o_plus: BloodType = BloodType.objects.get(
            blood_type="O", rhesus_factor=True
        )
        self.user_1: User = insert_default_user(
            self.icon, self.o_plus, "Test", "Subject1"
        )
        self.user_2: User = insert_default_user(
            self.icon, self.o_plus, "Test", "Subject2"
        )

    def test_chat_list_incorrect_data(self) -> None:
        request = MagicMock(spec=Request)
        request.query_params = 3
        response: Response = ChatPeopleView().get(request)
        self.assertEquals(response.status_code, 400)

    def test_chat_list_nonexisting_user(self) -> None:
        request = MagicMock(spec=Request)
        request.query_params = ChatPeopleRequest(999).as_dictionary()
        response: Response = ChatPeopleView().get(request)
        self.assertEquals(response.status_code, 404)

    def test_chat_list_valid_user(self) -> None:
        request = MagicMock(spec=Request)
        Chat.objects.create(donor=self.user_1, receiver=self.user_2, valid_status=True)
        request.query_params = ChatPeopleRequest(self.user_1.pk).as_dictionary()
        response: Response = ChatPeopleView().get(request)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(
            response.data, [ChatPeopleResponse.from_user(self.user_2).as_dictionary()]
        )

    def test_chat_messages_incorrect_data(self) -> None:
        request = MagicMock(spec=Request)
        request.query_params = 3
        response: Response = ChatMessagesView().get(request)
        self.assertEquals(response.status_code, 400)

    def test_chat_messages_valid_chat(self) -> None:
        request = MagicMock(spec=Request)
        chat = Chat.objects.create(
            donor=self.user_1, receiver=self.user_2, valid_status=True
        )
        message = Message.objects.create(
            chat=chat, sender=self.user_1, message_text="test", message_status="default"
        )
        request.query_params = ChatMessagesRequest(
            self.user_1.pk, self.user_2.pk
        ).as_dictionary()
        response: Response = ChatMessagesView().get(request)
        self.assertEquals(response.status_code, 200)
        expected = ChatMessageResponse.from_message(message).as_dictionary()
        expected["message_timestamp"] = ANY
        self.assertEquals(response.data, [expected])

    def test_new_message_incorrect_data(self) -> None:
        request = MagicMock(spec=Request)
        request.data = 3
        response: Response = ChatNewMessageView().post(request)
        self.assertEquals(response.status_code, 400)

    def test_new_message_valid_message(self) -> None:
        request = MagicMock(spec=Request)
        Chat.objects.create(donor=self.user_1, receiver=self.user_2, valid_status=True)
        request.data = ChatNewMessageRequest(
            self.user_2.pk, self.user_1.pk, "test"
        ).as_dictionary()
        response: Response = ChatNewMessageView().post(request)
        self.assertEquals(response.status_code, 200)
