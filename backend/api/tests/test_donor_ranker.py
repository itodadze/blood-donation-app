from datetime import datetime

from django.test import TestCase

from api.api_models.search_models import BroadcastSearchRequest
from api.core.donor_ranker import DonorPriorityRanker
from api.models import UserIcon, BloodType, User
from test_blood_matcher import fill_blood_types
from test_filter_users import insert_default_user


def insert_user_by_location(icon: UserIcon, blood: BloodType,
                            loc_latitude: float, loc_longitude: float) -> User:
    email = "test" + str(loc_latitude) + "_" + str(loc_longitude) + "@gmail.com"
    return User.objects.create(
        email=email, first_name="Test", last_name="Subject", password_hash="1",
        birthday=datetime(1995, 12, 12), loc_longitude=loc_longitude,
        loc_latitude=loc_latitude, blood_type=blood, donor_status=True, icon=icon,
        description="Test Subject", register_date=datetime.now()
    )


def default_broadcast_search_request(user: User, blood: BloodType, loc_latitude: float,
                                     loc_longitude: float) -> BroadcastSearchRequest:
    return BroadcastSearchRequest(
        blood_id=blood.pk, description="Test", emergency_status=True,
        loc_latitude=loc_latitude, loc_longitude=loc_longitude, user_id=user.pk
    )


class DonorPriorityRankerTestCase(TestCase):
    def setUp(self) -> None:
        self.icon: UserIcon = UserIcon.objects.create(file_address="path/to/icon")
        fill_blood_types()
        self.a_minus: BloodType = BloodType.objects.get(blood_type="A", rhesus_factor=False)
        self.user = insert_default_user(self.icon, self.a_minus, "Test", "Recipient")
        self.user_1 = insert_user_by_location(self.icon, self.a_minus, 11.0, 9.0)
        self.user_2 = insert_user_by_location(self.icon, self.a_minus, 18.0, 7.0)
        self.user_3 = insert_user_by_location(self.icon, self.a_minus, 15.0, 8.0)

    def test_donor_priority_ranking(self) -> None:
        ranker = DonorPriorityRanker(default_broadcast_search_request(
            self.user, self.a_minus, 14.0, 8.0))
        result = ranker.rank([self.user_1, self.user_2, self.user_3])
        self.assertEquals(result[0].pk, self.user_3.pk)
        self.assertEquals(result[1].pk, self.user_1.pk)
        self.assertEquals(result[2].pk, self.user_2.pk)
