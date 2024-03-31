from uuid import UUID

from django.db.models import Q

from api.models import Blood_Types

DONATION: dict[str, list[str]] = {
    'O': ['O', 'A', 'B', 'AB'],
    'A': ['A', 'AB'],
    'B': ['B', 'AB'],
    'AB': ['AB'],
}

RECEPTION: dict[str, list[str]] = {
    'O': ['O'],
    'A': ['O', 'A'],
    'B': ['O', 'B'],
    'AB': ['O', 'A', 'B', 'AB'],
}


def all_blood_types() -> list[UUID]:
    return list(Blood_Types.objects.values_list('id', flat=True))


def all_recipients(identifier: UUID) -> list[UUID]:
    donor: Blood_Types = Blood_Types.objects.get(pk=identifier)
    return list(Blood_Types
                .objects
                .filter(Q(rhesus_factor=donor.rhesus_factor) | Q(rhesus_factor=True),
                        blood_type__in=DONATION.get(donor.blood_type)).values_list('id', flat=True))


def all_donors(identifier: UUID) -> list[UUID]:
    recipient: Blood_Types = Blood_Types.objects.get(pk=identifier)
    return list(Blood_Types
                .objects
                .filter(Q(rhesus_factor=recipient.rhesus_factor) | Q(rhesus_factor=False),
                        blood_type__in=RECEPTION.get(recipient.blood_type)).values_list('id', flat=True))
