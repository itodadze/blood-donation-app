from datetime import datetime
from unittest.mock import MagicMock

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.response import Response

from api.api_models.search_models import FilterRequest
from api.models import BloodType, User, UserIcon
from api.views.user_views import FilterDonorsView


def insert_default_user(
    icon: UserIcon, blood: BloodType, first_name: str, last_name: str
) -> User:
    email: str = first_name + "_" + last_name + "@gmail.com"
    return User.objects.create(
        email=email,
        first_name=first_name,
        last_name=last_name,
        loc_longitude=11.1,
        loc_latitude=5.5,
        blood_type=blood,
        donor_status=True,
        description="Test Subject",
        icon=icon,
        register_date=datetime.now(),
    )


class FilterUsersRequestsTestCase(TestCase):
    def setUp(self) -> None:
        self.icon: UserIcon = UserIcon.objects.create(file_address="path/to/icon")
        self.o_plus: BloodType = BloodType.objects.get(
            blood_type="O", rhesus_factor=True
        )
        self.a_minus: BloodType = BloodType.objects.get(
            blood_type="A", rhesus_factor=False
        )
        insert_default_user(self.icon, self.o_plus, "Test", "Subject1")
        insert_default_user(self.icon, self.o_plus, "Test", "Subject2")
        insert_default_user(self.icon, self.a_minus, "Test", "Subject3")

    def test_filter_users_blood(self) -> None:
        search = FilterRequest(self.o_plus.pk, True).as_dictionary()
        request = MagicMock(spec=Request)
        request.query_params = search
        response: Response = FilterDonorsView().get(request)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(list(response.data)), 2)
