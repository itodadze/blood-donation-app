from dataclasses import dataclass

from api.models import User, Message, Chat
from datetime import datetime


@dataclass
class ChatPeopleRequest:
    user_id: int

    def as_dictionary(self) -> dict:
        return {
            "user_id": self.user_id
        }


@dataclass
class ChatMessagesRequest:
    logged_in_user_id: int
    chat_user_id: int


@dataclass
class ChatNewMessageRequest:
    sender_id: int
    receiver_id: int
    message_text: str


@dataclass
class ConversationCreateRequest:
    receiver_id: int
    donor_id: int

    def as_dictionary(self) -> dict:
        return {
            "receiver_id": self.receiver_id,
            "donor_id": self.donor_id
        }


@dataclass
class ConversationDeleteRequest:
    receiver_id: int
    donor_id: int

    def as_dictionary(self) -> dict:
        return {
            "receiver_id": self.receiver_id,
            "donor_id": self.donor_id
        }


@dataclass
class ChatPeopleResponse:
    id: int
    email: str
    first_name: str
    last_name: str

    @staticmethod
    def from_user(user: User) -> 'ChatPeopleResponse':
        return ChatPeopleResponse(
            id=user.id, email=user.email, first_name=user.first_name, last_name=user.last_name,
        )

    def as_dictionary(self) -> dict:
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name
        }


@dataclass
class ChatMessageResponse:
    sender_id: int
    message_text: str
    message_status: str
    message_timestamp: datetime

    @staticmethod
    def from_message(message: Message) -> 'ChatMessageResponse':
        return ChatMessageResponse(
            sender_id=message.sender.id, message_text=message.message_text, message_status=message.message_status,
            message_timestamp=message.message_timestamp)


@dataclass
class ConversationResponse:
    id: int

    @staticmethod
    def from_chat(chat: Chat) -> 'ConversationResponse':
        return ConversationResponse(id=chat.id)
