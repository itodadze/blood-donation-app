from django.test import TestCase
from unittest.mock import MagicMock

from rest_framework.request import Request
from rest_framework.response import Response

from api.api_models.chat_models import ChatPeopleRequest, ChatPeopleResponse
from api.models import UserIcon, BloodType, User, Chat
from api.views.chat_views import ChatPeopleView
from test_filter_users import insert_default_user


class ChatTestCase(TestCase):
    def setUp(self) -> None:
        self.icon: UserIcon = UserIcon.objects.create(file_address="path/to/icon")
        self.o_plus: BloodType = BloodType.objects.get(blood_type="O", rhesus_factor=True)
        self.user_1: User = insert_default_user(
            self.icon, self.o_plus, "Test", "Subject1")
        self.user_2: User = insert_default_user(
            self.icon, self.o_plus, "Test", "Subject2")

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
        self.assertEquals(response.data, [ChatPeopleResponse.from_user(self.user_2).as_dictionary()])
