from uuid import UUID

from django.test import TestCase

from api.core.blood_matcher import all_blood_types, all_recipients, all_donors
from api.models import BloodType


def fill_blood_types() -> None:
    BloodType.objects.create(blood_type="O", rhesus_factor=False, narrative="პირველი უარყოფითი")
    BloodType.objects.create(blood_type="O", rhesus_factor=True, narrative="პირველი დადებითი")
    BloodType.objects.create(blood_type="A", rhesus_factor=False, narrative="მეორე უარყოფითი")
    BloodType.objects.create(blood_type="A", rhesus_factor=True, narrative="მეორე დადებითი")
    BloodType.objects.create(blood_type="B", rhesus_factor=False, narrative="მესამე უარყოფითი")
    BloodType.objects.create(blood_type="B", rhesus_factor=True, narrative="მესამე დადებითი")
    BloodType.objects.create(blood_type="AB", rhesus_factor=False, narrative="მეოთხე უარყოფითი")
    BloodType.objects.create(blood_type="AB", rhesus_factor=True, narrative="მეოთხე დადებითი")


class BloodMatcherTestCase(TestCase):
    def setUp(self) -> None:
        fill_blood_types()

    def test_all_blood_types(self) -> None:
        result: list[UUID] = all_blood_types()
        self.assertEqual(len(result), 8, "Does not gather all blood types")

    def test_negative_recipients(self) -> None:
        current: UUID = BloodType.objects.get(blood_type="A", rhesus_factor=False).pk
        result: list[UUID] = all_recipients(current)
        self.assertEqual(len(result), 4, "Wrong amount of recipient blood types")
        expected: list[UUID] = [
            BloodType.objects.get(blood_type="A", rhesus_factor=False).pk,
            BloodType.objects.get(blood_type="AB", rhesus_factor=False).pk,
            BloodType.objects.get(blood_type="A", rhesus_factor=True).pk,
            BloodType.objects.get(blood_type="AB", rhesus_factor=True).pk,
        ]
        self.assertEqual(set(result), set(expected), "Wrong blood types")

    def test_positive_recipients(self) -> None:
        current: UUID = BloodType.objects.get(blood_type="O", rhesus_factor=True).pk
        result: list[UUID] = all_recipients(current)
        self.assertEqual(len(result), 4, "Wrong amount of recipient blood types")
        expected: list[UUID] = [
            BloodType.objects.get(blood_type="O", rhesus_factor=True).pk,
            BloodType.objects.get(blood_type="A", rhesus_factor=True).pk,
            BloodType.objects.get(blood_type="B", rhesus_factor=True).pk,
            BloodType.objects.get(blood_type="AB", rhesus_factor=True).pk,
        ]
        self.assertEqual(set(result), set(expected), "Wrong blood types")

    def test_negative_donors(self) -> None:
        current: UUID = BloodType.objects.get(blood_type="B", rhesus_factor=False).pk
        result: list[UUID] = all_donors(current)
        self.assertEqual(len(result), 2, "Wrong amount of recipient blood types")
        expected: list[UUID] = [
            BloodType.objects.get(blood_type="O", rhesus_factor=False).pk,
            BloodType.objects.get(blood_type="B", rhesus_factor=False).pk,
        ]
        self.assertEqual(set(result), set(expected), "Wrong blood types")

    def test_positive_donors(self) -> None:
        current: UUID = BloodType.objects.get(blood_type="AB", rhesus_factor=True).pk
        result: list[UUID] = all_donors(current)
        self.assertEqual(len(result), 8, "Wrong amount of recipient blood types")
        expected: list[UUID] = [
            BloodType.objects.get(blood_type="O", rhesus_factor=False).pk,
            BloodType.objects.get(blood_type="O", rhesus_factor=True).pk,
            BloodType.objects.get(blood_type="A", rhesus_factor=False).pk,
            BloodType.objects.get(blood_type="A", rhesus_factor=True).pk,
            BloodType.objects.get(blood_type="B", rhesus_factor=False).pk,
            BloodType.objects.get(blood_type="B", rhesus_factor=True).pk,
            BloodType.objects.get(blood_type="AB", rhesus_factor=False).pk,
            BloodType.objects.get(blood_type="AB", rhesus_factor=True).pk,
        ]
        self.assertEqual(set(result), set(expected), "Wrong blood types")
