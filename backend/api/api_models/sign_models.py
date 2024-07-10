from dataclasses import dataclass
from datetime import datetime


@dataclass
class RegisterUserRequest:
    firstName: str
    lastName: str
    email: str
    password: str
    passwordConfirm: str
    date: datetime
    lat: float
    lon: float
    blood: int
    donor: bool


@dataclass
class LoginUserRequest:
    email: str
    password: str


@dataclass
class ExistsUserRequest:
    email: str


@dataclass
class ExistsUserResponse:
    exists: bool
