from dataclasses import dataclass


@dataclass
class UserUpdateRequest:
    id: int
    icon_id: int | None = None
    first_name: str | None = None
    last_name: str | None = None
    email: str | None = None
    description: str | None = None
    loc_longitude: float | None = None
    loc_latitude: float | None = None

    def as_dictionary(self) -> dict:
        return {
            "id": self.id,
            "icon_id": self.icon_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "description": self.description,
            "loc_longitude": self.loc_longitude,
            "loc_latitude": self.loc_latitude
        }
