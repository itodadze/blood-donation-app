from dataclasses import dataclass

from api.models import User


@dataclass
class ChatPeopleRequest:
    user_email: str


@dataclass
class ChatPeopleResponse:
    email: str
    first_name: str
    last_name: str

    @staticmethod
    def from_user(user: User) -> 'ChatPeopleResponse':
        return ChatPeopleResponse(
            email=user.email, first_name=user.first_name, last_name=user.last_name,
        )
