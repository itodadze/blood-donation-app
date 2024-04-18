from dataclasses import dataclass
from uuid import UUID


@dataclass
class FilterRequest:
    narrative: str | None
    exact_match: bool

    def as_dictionary(self) -> dict:
        return {
            "narrative": self.narrative,
            "exact_match": self.exact_match
        }


@dataclass
class BroadcastSearchRequest:
    user_id: UUID
    narrative: str
    description: str
    emergency_status: bool
    loc_longitude: float
    loc_latitude: float

    def as_dictionary(self) -> dict:
        return {
            "user_id": self.user_id,
            "narrative": self.narrative,
            "description": self.description,
            "emergency_status": self.emergency_status,
            "loc_longitude": self.loc_longitude,
            "loc_latitude": self.loc_latitude
        }
