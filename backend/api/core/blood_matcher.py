from django.db.models import Q

from api.models import BloodType

DONATION: dict[str, list[str]] = {
    "O": ["O", "A", "B", "AB"],
    "A": ["A", "AB"],
    "B": ["B", "AB"],
    "AB": ["AB"],
}

RECEPTION: dict[str, list[str]] = {
    "O": ["O"],
    "A": ["O", "A"],
    "B": ["O", "B"],
    "AB": ["O", "A", "B", "AB"],
}


def all_blood_types() -> list[int]:
    return list(BloodType.objects.values_list("id", flat=True))


def all_recipients(identifier: int) -> list[int]:
    donor: BloodType = BloodType.objects.get(pk=identifier)
    return list(
        BloodType.objects.filter(
            Q(rhesus_factor=donor.rhesus_factor) | Q(rhesus_factor=True),
            blood_type__in=DONATION.get(donor.blood_type),
        ).values_list("id", flat=True)
    )


def all_donors(identifier: int) -> list[int]:
    recipient: BloodType = BloodType.objects.get(pk=identifier)
    return list(
        BloodType.objects.filter(
            Q(rhesus_factor=recipient.rhesus_factor) | Q(rhesus_factor=False),
            blood_type__in=RECEPTION.get(recipient.blood_type),
        ).values_list("id", flat=True)
    )
