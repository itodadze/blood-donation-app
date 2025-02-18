from datetime import datetime
from unittest.mock import MagicMock

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.response import Response

from api.api_models.search_models import FilterReceiverRequest
from api.models import BloodType, ReceiverRequest, User, UserIcon
from api.tests.test_filter_users import insert_default_user
from api.views.search_views import FilterSearchRequestsView


class FilterSearchRequestsTestCase(TestCase):
    def setUp(self) -> None:
        self.o_minus: BloodType = BloodType.objects.get(
            blood_type="O", rhesus_factor=False
        )
        self.o_plus: BloodType = BloodType.objects.get(
            blood_type="O", rhesus_factor=True
        )
        self.ab_minus: BloodType = BloodType.objects.get(
            blood_type="AB", rhesus_factor=False
        )
        self.ab_plus: BloodType = BloodType.objects.get(
            blood_type="AB", rhesus_factor=True
        )
        icon: UserIcon = UserIcon.objects.create(file_address="path/to/icon")
        self.user: User = insert_default_user(icon, self.o_plus, "Test", "Subject")
        ReceiverRequest.objects.create(
            user=self.user,
            blood_type=self.o_minus,
            description="searching",
            search_status=True,
            emergency_status=True,
            loc_longitude=55.5,
            loc_latitude=55.5,
            request_date=datetime.now(),
        )
        ReceiverRequest.objects.create(
            user=self.user,
            blood_type=self.o_plus,
            description="searching",
            search_status=True,
            emergency_status=True,
            loc_longitude=15.5,
            loc_latitude=22.5,
            request_date=datetime.now(),
        )
        ReceiverRequest.objects.create(
            user=self.user,
            blood_type=self.ab_minus,
            description="searching",
            search_status=True,
            emergency_status=True,
            loc_longitude=19.5,
            loc_latitude=1.5,
            request_date=datetime.now(),
        )
        ReceiverRequest.objects.create(
            user=self.user,
            blood_type=self.ab_minus,
            description="searching",
            search_status=False,
            emergency_status=True,
            loc_longitude=15.5,
            loc_latitude=22.5,
            request_date=datetime.now(),
        )

    def test_filter_search_wrong_blood(self) -> None:
        search = FilterReceiverRequest(self.ab_plus.pk, False, False).as_dictionary()
        request = MagicMock(spec=Request)
        request.query_params = search
        response: Response = FilterSearchRequestsView().get(request)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(list(response.data)), 0)

    def test_filter_search_ignores_inactive(self) -> None:
        search = FilterReceiverRequest(self.ab_minus.pk, False, False).as_dictionary()
        request = MagicMock(spec=Request)
        request.query_params = search
        response: Response = FilterSearchRequestsView().get(request)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(list(response.data)), 1)
