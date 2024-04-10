from unittest.mock import MagicMock

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.response import Response

from api.api_models.search_models import BroadcastSearchRequest
from api.models import UserIcon, BloodType, User, ReceiverRequest
from api.views.search_views import BroadcastSearchView
from test_blood_matcher import fill_blood_types
from test_filter_users import insert_default_user


class BroadcastSearchTestCase(TestCase):
    def setUp(self) -> None:
        fill_blood_types()
        icon: UserIcon = UserIcon.objects.create(file_address="path/to/icon")
        self.b_plus: BloodType = BloodType.objects.get(blood_type="B", rhesus_factor=True)
        self.user: User = insert_default_user(icon, self.b_plus, "Test", "Subject")

    def test_broadcast_search_adds_invalid(self) -> None:
        search = "test_invalid"
        request = MagicMock(spec=Request)
        request.data = search
        response: Response = BroadcastSearchView().broadcast(request)
        self.assertEquals(response.status_code, 400)

    def test_broadcast_search_adds_valid(self) -> None:
        search = BroadcastSearchRequest(
            self.user.pk, self.b_plus.pk, "Test Search", True, 1.0, 10.0
        ).as_dictionary()
        request = MagicMock(spec=Request)
        request.data = search
        response: Response = BroadcastSearchView().broadcast(request)
        self.assertEquals(response.status_code, 200)
        row = ReceiverRequest.objects.get(user=self.user.pk)
        self.assertIsNotNone(row)
