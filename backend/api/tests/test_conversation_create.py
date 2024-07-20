from datetime import datetime
from unittest.mock import MagicMock

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.response import Response

from api.api_models.chat_models import ConversationCreateRequest
from api.models import UserIcon, BloodType, User, Chat
from api.views.chat_views import ConversationCreateView
from test_filter_users import insert_default_user


class ConversationCreateTestCase(TestCase):
    def setUp(self) -> None:
        self.icon: UserIcon = UserIcon.objects.create(file_address="path/to/icon")
        self.o_plus: BloodType = BloodType.objects.get(blood_type="O", rhesus_factor=True)
        self.user_1: User = insert_default_user(
            self.icon, self.o_plus, "Test", "Subject1")
        self.user_2: User = insert_default_user(
            self.icon, self.o_plus, "Test", "Subject2")

    def test_create_conversation_incorrect_data(self) -> None:
        request = MagicMock(spec=Request)
        request.data = 3
        response: Response = ConversationCreateView().post(request)
        self.assertEquals(response.status_code, 400)

    def test_create_conversation_invalid_user(self) -> None:
        request = MagicMock(spec=Request)
        request.data = ConversationCreateRequest(self.user_2.pk, 999).as_dictionary()
        response: Response = ConversationCreateView().post(request)
        self.assertEquals(response.status_code, 400)

    def test_create_conversation_existing_conversation(self) -> None:
        Chat.objects.create(
            donor=self.user_1, receiver=self.user_2, start_date=datetime.now(), valid_status=True
        )
        request = MagicMock(spec=Request)
        request.data = ConversationCreateRequest(self.user_2.pk, self.user_1.pk).as_dictionary()
        response: Response = ConversationCreateView().post(request)
        self.assertEquals(response.status_code, 200)

    def test_create_conversation_new_conversation(self) -> None:
        request = MagicMock(spec=Request)
        request.data = ConversationCreateRequest(self.user_2.pk, self.user_1.pk).as_dictionary()
        response: Response = ConversationCreateView().post(request)
        self.assertEquals(response.status_code, 201)
