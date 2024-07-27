from dataclasses import dataclass
from datetime import datetime

from api.models import Chat, Message, User


@dataclass
class ChatPeopleRequest:
    user_id: int

    def as_dictionary(self) -> dict:
        return {"user_id": self.user_id}


@dataclass
class ChatMessagesRequest:
    logged_in_user_id: int
    chat_user_id: int

    def as_dictionary(self) -> dict:
        return {
            "logged_in_user_id": self.logged_in_user_id,
            "chat_user_id": self.chat_user_id,
        }


@dataclass
class ChatNewMessageRequest:
    sender_id: int
    receiver_id: int
    message_text: str

    def as_dictionary(self) -> dict:
        return {
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "message_text": self.message_text,
        }


@dataclass
class ConversationCreateRequest:
    receiver_id: int
    donor_id: int

    def as_dictionary(self) -> dict:
        return {"receiver_id": self.receiver_id, "donor_id": self.donor_id}


@dataclass
class ConversationDeleteRequest:
    receiver_id: int
    donor_id: int

    def as_dictionary(self) -> dict:
        return {"receiver_id": self.receiver_id, "donor_id": self.donor_id}


@dataclass
class ChatPeopleResponse:
    id: int
    email: str
    first_name: str
    last_name: str
    icon_file_address: str | None = None

    @staticmethod
    def from_user(user: User) -> "ChatPeopleResponse":
        return ChatPeopleResponse(
            id=user.id,
            email=user.email,
            first_name=user.first_name,
            last_name=user.last_name,
            icon_file_address=user.icon.file_address if user.icon else None
        )

    def as_dictionary(self) -> dict:
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "icon_file_address": self.icon_file_address,
        }


@dataclass
class ChatMessageResponse:
    sender_id: int
    message_text: str
    message_status: str
    message_timestamp: datetime

    @staticmethod
    def from_message(message: Message) -> "ChatMessageResponse":
        return ChatMessageResponse(
            sender_id=message.sender.id,
            message_text=message.message_text,
            message_status=message.message_status,
            message_timestamp=message.message_timestamp,
        )

    def as_dictionary(self) -> dict:
        return {
            "sender_id": self.sender_id,
            "message_text": self.message_text,
            "message_status": self.message_status,
            "message_timestamp": self.message_timestamp,
        }


@dataclass
class ConversationResponse:
    id: int

    @staticmethod
    def from_chat(chat: Chat) -> "ConversationResponse":
        return ConversationResponse(id=chat.id)
