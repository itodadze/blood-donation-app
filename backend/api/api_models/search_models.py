from dataclasses import dataclass
from uuid import UUID


@dataclass
class FilterSearchRequest:
    narrative: str | None
    exact_match: bool

    def as_dictionary(self) -> dict:
        return {
            "narrative": self.narrative,
            "exact_match": self.exact_match
        }


class FilterUsersRequest:
    blood_id: UUID | None
    name: str

    def __init__(self, blood_id: UUID | None, name: str):
        self.blood_id = blood_id
        if name is None or len(name) == 0:
            self.name = " "
        else:
            self.name = name

    def as_dictionary(self) -> dict:
        return {
            "blood_id": self.blood_id,
            "name": self.name
        }


@dataclass
class BroadcastSearchRequest:
    user_id: UUID
    blood_id: UUID
    description: str
    emergency_status: bool
    loc_longitude: float
    loc_latitude: float

    def as_dictionary(self) -> dict:
        return {
            "user_id": self.user_id,
            "blood_id": self.blood_id,
            "description": self.description,
            "emergency_status": self.emergency_status,
            "loc_longitude": self.loc_longitude,
            "loc_latitude": self.loc_latitude
        }
