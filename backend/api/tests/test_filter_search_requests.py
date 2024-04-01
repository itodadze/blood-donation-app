from datetime import datetime
from unittest.mock import MagicMock

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.response import Response

from api.api_models.search_models import FilterSearchRequest
from api.models import Receiver_Request_Hist, Users, Blood_Types, User_Icons
from api.tests.test_blood_matcher import fill_blood_types
from api.views.search_views import FilterSearchRequestsView


def insert_default_user(blood: Blood_Types) -> Users:
    icon: User_Icons = User_Icons.objects.create(file_address="path/to/icon")
    return Users.objects.create(
        email="test_subject@gmail.com", first_name="Test", last_name="Subject", password_hash="1",
        birthday=datetime(1995, 12, 12), loc_longitude=11.1, loc_latitude=5.5,
        blood_type=blood, donor_status=False, description="Test Subject", icon=icon,
        register_date=datetime.now()
    )


class FilterSearchRequestsTestCase(TestCase):
    def setUp(self) -> None:
        fill_blood_types()
        self.o_minus: Blood_Types = Blood_Types.objects.get(blood_type="O", rhesus_factor=False)
        self.o_plus: Blood_Types = Blood_Types.objects.get(blood_type="O", rhesus_factor=True)
        self.ab_minus: Blood_Types = Blood_Types.objects.get(blood_type="AB", rhesus_factor=False)
        self.ab_plus: Blood_Types = Blood_Types.objects.get(blood_type="AB", rhesus_factor=True)
        self.user: Users = insert_default_user(self.o_plus)
        Receiver_Request_Hist.objects.create(
            user=self.user, blood_type=self.o_minus, description="searching", search_status=True,
            emergency_status=True, loc_longitude=55.5, loc_latitude=55.5, request_date=datetime.now()
        )
        Receiver_Request_Hist.objects.create(
            user=self.user, blood_type=self.o_plus, description="searching", search_status=True,
            emergency_status=True, loc_longitude=15.5, loc_latitude=22.5, request_date=datetime.now()
        )
        Receiver_Request_Hist.objects.create(
            user=self.user, blood_type=self.ab_minus, description="searching", search_status=True,
            emergency_status=True, loc_longitude=19.5, loc_latitude=1.5, request_date=datetime.now()
        )
        Receiver_Request_Hist.objects.create(
            user=self.user, blood_type=self.ab_minus, description="searching", search_status=False,
            emergency_status=True, loc_longitude=15.5, loc_latitude=22.5, request_date=datetime.now()
        )

    def test_filter_search_incorrect_data(self) -> None:
        request = MagicMock(spec=Request)
        request.data = 5
        response: Response = FilterSearchRequestsView().get(request)
        self.assertEquals(response.status_code, 400)

    def test_filter_search_wrong_blood(self) -> None:
        search = FilterSearchRequest(self.ab_plus.pk, 0, 50, 50, 0, False).as_dictionary()
        request = MagicMock(spec=Request)
        request.data = search
        response: Response = FilterSearchRequestsView().get(request)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(list(response.data)), 0)

    def test_filter_search_ignores_inactive(self) -> None:
        search = FilterSearchRequest(self.ab_minus.pk, 0, 50, 50, 0, False).as_dictionary()
        request = MagicMock(spec=Request)
        request.data = search
        response: Response = FilterSearchRequestsView().get(request)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(list(response.data)), 1)

    def test_filter_search_location_x_constraints(self) -> None:
        search = FilterSearchRequest(self.o_minus.pk, 3, 50, 18, 0, False).as_dictionary()
        request = MagicMock(spec=Request)
        request.data = search
        response: Response = FilterSearchRequestsView().get(request)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(list(response.data)), 1)

    def test_filter_search_location_y_constraints(self) -> None:
        search = FilterSearchRequest(self.o_minus.pk, 0, 20, 50, 1, False).as_dictionary()
        request = MagicMock(spec=Request)
        request.data = search
        response: Response = FilterSearchRequestsView().get(request)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(list(response.data)), 1)

    def test_filter_search_exact_match(self) -> None:
        search = FilterSearchRequest(self.o_minus.pk, 0, 60, 60, 0, True).as_dictionary()
        request = MagicMock(spec=Request)
        request.data = search
        response: Response = FilterSearchRequestsView().get(request)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(list(response.data)), 1)
