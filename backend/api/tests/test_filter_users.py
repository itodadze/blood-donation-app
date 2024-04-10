from datetime import datetime
from unittest.mock import MagicMock

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.response import Response

from api.api_models.search_models import FilterUsersRequest
from api.models import UserIcon, BloodType, User
from api.tests.test_blood_matcher import fill_blood_types
from api.views.search_views import FilterUsersView


def insert_default_user(icon: UserIcon, blood: BloodType,
                        first_name: str, last_name: str) -> User:
    email: str = first_name + "_" + last_name + "@gmail.com"
    return User.objects.create(
        email=email, first_name=first_name, last_name=last_name, password_hash="1",
        birthday=datetime(1995, 12, 12), loc_longitude=11.1, loc_latitude=5.5,
        blood_type=blood, donor_status=False, description="Test Subject", icon=icon,
        register_date=datetime.now()
    )


class FilterUsersRequestsTestCase(TestCase):
    def setUp(self) -> None:
        self.icon: UserIcon = UserIcon.objects.create(file_address="path/to/icon")
        fill_blood_types()
        self.o_plus: BloodType = BloodType.objects.get(blood_type="O", rhesus_factor=True)
        self.a_minus: BloodType = BloodType.objects.get(blood_type="A", rhesus_factor=False)
        insert_default_user(self.icon, self.o_plus, "Test", "Subject1")
        insert_default_user(self.icon, self.o_plus, "Test", "Subject2")
        insert_default_user(self.icon, self.a_minus, "Test", "Subject3")

    def test_filter_users_incorrect_data(self) -> None:
        search = "test"
        request = MagicMock(spec=Request)
        request.data = search
        response: Response = FilterUsersView().get(request)
        self.assertEquals(response.status_code, 400)

    def test_filter_users_blood(self) -> None:
        search = FilterUsersRequest(self.o_plus.pk, "").as_dictionary()
        request = MagicMock(spec=Request)
        request.data = search
        response: Response = FilterUsersView().get(request)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(list(response.data)), 2)

    def test_filter_users_name_starts(self) -> None:
        search = FilterUsersRequest(None, "test").as_dictionary()
        request = MagicMock(spec=Request)
        request.data = search
        response: Response = FilterUsersView().get(request)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(list(response.data)), 3)

    def test_filter_users_name_and_blood(self) -> None:
        search = FilterUsersRequest(self.a_minus.pk, "tEST").as_dictionary()
        request = MagicMock(spec=Request)
        request.data = search
        response: Response = FilterUsersView().get(request)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(list(response.data)), 1)

    def test_filter_users_name_ends(self) -> None:
        search = FilterUsersRequest(None, "subject1").as_dictionary()
        request = MagicMock(spec=Request)
        request.data = search
        response: Response = FilterUsersView().get(request)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(list(response.data)), 1)
