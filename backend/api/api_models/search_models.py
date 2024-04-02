from dataclasses import dataclass
from uuid import UUID


@dataclass
class FilterSearchRequest:
    blood_id: UUID
    top_left_x: float
    top_left_y: float
    bottom_right_x: float
    bottom_right_y: float
    exact_match: bool

    def as_dictionary(self) -> dict:
        return {
            "blood_id": self.blood_id,
            "top_left_x": self.top_left_x,
            "top_left_y": self.top_left_y,
            "bottom_right_x": self.bottom_right_x,
            "bottom_right_y": self.bottom_right_y,
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
