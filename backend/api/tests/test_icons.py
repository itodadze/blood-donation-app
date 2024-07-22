from unittest.mock import MagicMock

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.response import Response
from test_filter_users import insert_default_user

from api.api_models.icon_models import IconSet
from api.models import BloodType, UserIcon
from api.views.icon_views import SetUserIconView, UserIconView


class UserIconsTestCase(TestCase):
    def setUp(self):
        self.icon = UserIcon.objects.get(file_address="icon_1")
        self.blood = BloodType.objects.get(narrative="პირველი უარყოფითი")
        self.user = insert_default_user(self.icon, self.blood, "Test", "Subject")

    def test_icons_get(self) -> None:
        request = MagicMock(spec=Request)
        response: Response = UserIconView().get(request)
        assert response.status_code == 200
        assert len(response.data) == 10

    def test_set_icon_invalid_request(self) -> None:
        request = MagicMock(spec=Request)
        request.data = 3
        response: Response = SetUserIconView().post(request)
        assert response.status_code == 400

    def test_set_icon_invalid_user(self) -> None:
        request = MagicMock(spec=Request)
        request.data = IconSet(999, self.icon.pk).as_dictionary()
        response: Response = SetUserIconView().post(request)
        assert response.status_code == 404

    def test_set_icon_invalid_icon(self) -> None:
        request = MagicMock(spec=Request)
        request.data = IconSet(self.user.pk, 999).as_dictionary()
        response: Response = SetUserIconView().post(request)
        assert response.status_code == 404

    def test_set_icon_valid_request(self) -> None:
        request = MagicMock(spec=Request)
        request.data = IconSet(self.user.pk, self.icon.pk).as_dictionary()
        response: Response = SetUserIconView().post(request)
        assert response.status_code == 200
