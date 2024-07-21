from unittest.mock import MagicMock

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.response import Response

from api.views.icon_views import UserIconView


class UserIconsTestCase(TestCase):
    def test_icons_get(self) -> None:
        request = MagicMock(spec=Request)
        response: Response = UserIconView().get(request)
        assert response.status_code == 200
        assert len(response.data) == 10
