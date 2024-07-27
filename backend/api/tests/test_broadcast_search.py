from unittest.mock import MagicMock

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.response import Response
from test_filter_users import insert_default_user

from api.api_models.search_models import BroadcastSearchRequest
from api.models import BloodType, ReceiverRequest, User, UserIcon
from api.views.search_views import BroadcastSearchView


class BroadcastSearchTestCase(TestCase):
    def setUp(self) -> None:
        icon: UserIcon = UserIcon.objects.create(file_address="path/to/icon")
        self.b_plus: BloodType = BloodType.objects.get(
            blood_type="B", rhesus_factor=True
        )
        self.user: User = insert_default_user(icon, self.b_plus, "Test", "Subject")

    def test_broadcast_search_adds_invalid(self) -> None:
        search = "test_invalid"
        request = MagicMock(spec=Request)
        request.data = search
        response: Response = BroadcastSearchView().post(request)
        self.assertEquals(response.status_code, 400)

    def test_broadcast_search_adds_valid(self) -> None:
        search = BroadcastSearchRequest(
            self.b_plus.pk, "Test Search", True, 1.0, 10.0
        ).as_dictionary()
        request = MagicMock(spec=Request)
        request.user = self.user
        request.data = search
        response: Response = BroadcastSearchView().post(request)
        self.assertEquals(response.status_code, 200)
        row = ReceiverRequest.objects.get(user=self.user.pk)
        self.assertIsNotNone(row)
