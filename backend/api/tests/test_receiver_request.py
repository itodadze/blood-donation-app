from unittest.mock import MagicMock

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.response import Response
from test_filter_users import insert_default_user

from api.api_models.request_models import ReceiverRequestId
from api.models import BloodType, ReceiverRequest, User, UserIcon
from api.views.request_views import ReceiverRequestView


class ReceiverRequestTestCase(TestCase):
    def setUp(self) -> None:
        self.icon: UserIcon = UserIcon.objects.create(file_address="path/to/icon")
        self.o_plus: BloodType = BloodType.objects.get(
            blood_type="O", rhesus_factor=True
        )
        self.user: User = insert_default_user(
            self.icon, self.o_plus, "Test", "Subject1"
        )

    def test_get_receiver_request_invalid_request(self) -> None:
        request = MagicMock(spec=Request)
        request.query_params = ReceiverRequestId(15).as_dictionary()
        response: Response = ReceiverRequestView().get(request)
        self.assertEquals(response.status_code, 400)

    def test_get_receiver_request_existing_request(self) -> None:
        expected = ReceiverRequest.objects.create(
            user=self.user, blood_type=self.o_plus, loc_longitude=5.0, loc_latitude=5.0
        )
        request = MagicMock(spec=Request)
        request.query_params = ReceiverRequestId(expected.pk).as_dictionary()
        response: Response = ReceiverRequestView().get(request)
        self.assertEquals(response.status_code, 200)

    def test_delete_receiver_request_existing_request(self) -> None:
        expected = ReceiverRequest.objects.create(
            user=self.user, blood_type=self.o_plus, loc_longitude=5.0, loc_latitude=5.0
        )
        request = MagicMock(spec=Request)
        request.query_params = ReceiverRequestId(expected.pk).as_dictionary()
        response: Response = ReceiverRequestView().delete(request)
        self.assertEquals(response.status_code, 204)
