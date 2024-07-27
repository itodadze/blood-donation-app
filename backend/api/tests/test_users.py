from unittest.mock import MagicMock

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.response import Response
from test_filter_users import insert_default_user

from api.api_models.user_models import UserUpdateRequest
from api.models import BloodType, User, UserIcon
from api.views.user_views import UserView


class UsersTestCase(TestCase):
    def setUp(self) -> None:
        self.icon: UserIcon = UserIcon.objects.create(file_address="path/to/icon")
        self.o_plus: BloodType = BloodType.objects.get(
            blood_type="O", rhesus_factor=True
        )
        self.a_minus: BloodType = BloodType.objects.get(
            blood_type="A", rhesus_factor=False
        )
        self.user: User = insert_default_user(
            self.icon, self.o_plus, "Test", "Subject1"
        )

    def test_get_user_not_found(self) -> None:
        request = MagicMock(spec=Request)
        request.query_params = {"id": 999}
        response: Response = UserView().get(request)
        self.assertEquals(response.status_code, 400)

    def test_get_user_valid_request(self) -> None:
        request = MagicMock(spec=Request)
        request.query_params = {"id": self.user.pk}
        response: Response = UserView().get(request)
        self.assertEquals(response.status_code, 200)

    def test_patch_user_partially(self) -> None:
        request = MagicMock(spec=Request)
        request.data = UserUpdateRequest(
            id=self.user.pk, icon_id=self.icon.pk
        ).as_dictionary()
        response: Response = UserView().patch(request)
        self.assertEquals(response.status_code, 200)
