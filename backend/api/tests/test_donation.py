from unittest.mock import MagicMock

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.response import Response

from api.api_models.donation_models import Donor
from api.models import UserIcon, BloodType, User, Donation
from api.views.donation_views import DonationView, DonationAmountView
from test_blood_matcher import fill_blood_types
from test_filter_users import insert_default_user


class DonationTestCase(TestCase):
    def setUp(self) -> None:
        self.icon: UserIcon = UserIcon.objects.create(file_address="path/to/icon")
        self.o_plus: BloodType = BloodType.objects.get(blood_type="O", rhesus_factor=True)
        self.user: User = insert_default_user(
            self.icon, self.o_plus, "Test", "Subject1")

    def test_create_donation_incorrect_data(self) -> None:
        request = MagicMock(spec=Request)
        request.data = 3
        response: Response = DonationView().post(request)
        self.assertEquals(response.status_code, 400)

    def test_create_donation_invalid_user(self) -> None:
        request = MagicMock(spec=Request)
        request.data = Donor(999).as_dictionary()
        response: Response = DonationView().post(request)
        self.assertEquals(response.status_code, 400)

    def test_create_donation_existing_user(self) -> None:
        request = MagicMock(spec=Request)
        request.data = Donor(self.user.pk).as_dictionary()
        response: Response = DonationView().post(request)
        self.assertEquals(response.status_code, 201)

    def test_get_donation_amount_incorrect_data(self) -> None:
        request = MagicMock(spec=Request)
        request.data = 3
        response: Response = DonationAmountView().get(request)
        self.assertEquals(response.status_code, 400)

    def test_get_donation_amount_valid_user(self) -> None:
        request = MagicMock(spec=Request)
        Donation.objects.create(donor=self.user)
        Donation.objects.create(donor=self.user)
        request.data = Donor(self.user.pk).as_dictionary()
        response: Response = DonationAmountView().get(request)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data, {"amount": 2})
