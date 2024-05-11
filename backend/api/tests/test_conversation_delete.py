from datetime import datetime
from unittest.mock import MagicMock

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.response import Response

from api.api_models.chat_models import ConversationDeleteRequest
from api.models import UserIcon, BloodType, User, Chat
from api.views.chat_views import ConversationDeleteView
from test_blood_matcher import fill_blood_types
from test_filter_users import insert_default_user


class ConversationDeleteTestCase(TestCase):
    def setUp(self) -> None:
        self.icon: UserIcon = UserIcon.objects.create(file_address="path/to/icon")
        fill_blood_types()
        self.o_plus: BloodType = BloodType.objects.get(blood_type="O", rhesus_factor=True)
        self.user_1: User = insert_default_user(
            self.icon, self.o_plus, "Test", "Subject1")
        self.user_2: User = insert_default_user(
            self.icon, self.o_plus, "Test", "Subject2")

    def test_delete_conversation_incorrect_data(self) -> None:
        request = MagicMock(spec=Request)
        request.data = 3
        response: Response = ConversationDeleteView().delete(request)
        self.assertEquals(response.status_code, 400)

    def test_delete_conversation_invalid_chat(self) -> None:
        request = MagicMock(spec=Request)
        request.data = ConversationDeleteRequest(999).as_dictionary()
        response: Response = ConversationDeleteView().delete(request)
        self.assertEquals(response.status_code, 400)

    def test_delete_conversation_existing_conversation(self) -> None:
        chat = Chat.objects.create(
            donor=self.user_1, receiver=self.user_2, start_date=datetime.now(), valid_status=True
        )
        request = MagicMock(spec=Request)
        request.data = ConversationDeleteRequest(chat.pk).as_dictionary()
        response: Response = ConversationDeleteView().delete(request)
        self.assertEquals(response.status_code, 204)
