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
