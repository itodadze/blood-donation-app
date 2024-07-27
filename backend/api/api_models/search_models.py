from dataclasses import dataclass
from uuid import UUID


@dataclass
class FilterRequest:
    id: int | None
    exact_match: bool

    def as_dictionary(self) -> dict:
        return {"id": self.id, "exact_match": self.exact_match}


@dataclass
class BroadcastSearchRequest:
    blood_id: UUID
    description: str
    emergency_status: bool
    loc_longitude: float
    loc_latitude: float

    def as_dictionary(self) -> dict:
        return {
            "blood_id": self.blood_id,
            "description": self.description,
            "emergency_status": self.emergency_status,
            "loc_longitude": self.loc_longitude,
            "loc_latitude": self.loc_latitude,
        }
