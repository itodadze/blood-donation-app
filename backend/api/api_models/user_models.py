from dataclasses import dataclass

from api.models import User


@dataclass
class UserResponse:
    email: str
    first_name: str
    last_name: str
    loc_longitude: float
    loc_latitude: float
    blood_type: str
    rhesus_factor: bool
    blood_narrative: str
    donor_status: bool
    description: str
    icon_path: str

    @staticmethod
    def from_user(user: User) -> 'UserResponse':
        return UserResponse(
            email=user.email, first_name=user.first_name, last_name=user.last_name,
            loc_longitude=user.loc_longitude, loc_latitude=user.loc_latitude,
            blood_type=user.blood_type.blood_type, rhesus_factor=user.blood_type.rhesus_factor,
            blood_narrative=user.blood_type.narrative, donor_status=user.donor_status,
            description=user.description, icon_path=user.icon.file_address
        )
