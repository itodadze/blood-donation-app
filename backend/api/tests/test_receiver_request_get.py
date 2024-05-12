from unittest.mock import MagicMock

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.response import Response

from api.api_models.request_models import ReceiverRequestGet
from api.models import UserIcon, BloodType, User, ReceiverRequest
from api.views.request_views import ReceiverRequestView
from test_blood_matcher import fill_blood_types
from test_filter_users import insert_default_user


class ReceiverRequestGetTestCase(TestCase):
    def setUp(self) -> None:
        self.icon: UserIcon = UserIcon.objects.create(file_address="path/to/icon")
        fill_blood_types()
        self.o_plus: BloodType = BloodType.objects.get(blood_type="O", rhesus_factor=True)
        self.user: User = insert_default_user(
            self.icon, self.o_plus, "Test", "Subject1")

    def test_get_receiver_request_incorrect_data(self) -> None:
        request = MagicMock(spec=Request)
        request.data = 3
        response: Response = ReceiverRequestView().get(request)
        self.assertEquals(response.status_code, 400)

    def test_get_receiver_request_invalid_request(self) -> None:
        request = MagicMock(spec=Request)
        request.data = ReceiverRequestGet(15).as_dictionary()
        response: Response = ReceiverRequestView().get(request)
        self.assertEquals(response.status_code, 400)

    def test_get_receiver_request_existing_request(self) -> None:
        expected = ReceiverRequest.objects.create(
            user=self.user, blood_type=self.o_plus, loc_longitude=5.0, loc_latitude=5.0
        )
        request = MagicMock(spec=Request)
        request.data = ReceiverRequestGet(expected.pk).as_dictionary()
        response: Response = ReceiverRequestView().get(request)
        self.assertEquals(response.status_code, 200)
