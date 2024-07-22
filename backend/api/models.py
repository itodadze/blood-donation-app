from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models


class BloodType(models.Model):
    blood_type = models.CharField(max_length=2)
    rhesus_factor = models.BooleanField()
    narrative = models.CharField(max_length=50)
    icon_path = models.CharField(blank=True, null=True)


class UserIcon(models.Model):
    file_address = models.CharField(max_length=200)


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=200, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birthday = models.DateField()
    loc_longitude = models.FloatField(null=True, blank=True)
    loc_latitude = models.FloatField(null=True, blank=True)
    blood_type = models.ForeignKey(
        BloodType, on_delete=models.CASCADE, null=True, blank=True
    )
    donor_status = models.BooleanField(default=False)
    description = models.TextField(null=True, blank=True)
    icon = models.ForeignKey(UserIcon, on_delete=models.CASCADE, null=True, blank=True)
    register_date = models.DateField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "birthday"]

    def __str__(self):
        return self.email


class ChatRequest(models.Model):
    initiator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="chats_initiated"
    )
    recipient = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="chats_received"
    )
    initiated_date = models.DateField(auto_now_add=True)
    accept_status = models.BooleanField(default=False)
    description = models.TextField(null=True, blank=True)


class Chat(models.Model):
    donor = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="donor_chats"
    )
    receiver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="receiver_chats"
    )
    start_date = models.DateField(auto_now_add=True)
    valid_status = models.BooleanField(default=True)


class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    message_text = models.TextField()
    message_status = models.CharField(max_length=20)
    message_timestamp = models.DateTimeField(auto_now_add=True)


class Instruction(models.Model):
    instruction_text = models.TextField()


class MedicalDocument(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    upload_date = models.DateField(auto_now_add=True)
    valid_status = models.BooleanField(default=True)
    file_address = models.CharField(max_length=200)
    description = models.TextField()


class ReceiverRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    blood_type = models.ForeignKey(BloodType, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    search_status = models.BooleanField(default=True)
    emergency_status = models.BooleanField(default=True)
    loc_longitude = models.FloatField()
    loc_latitude = models.FloatField()
    request_date = models.DateField(auto_now_add=True)


class Donation(models.Model):
    donor = models.ForeignKey(User, on_delete=models.CASCADE)
    donation_date = models.DateField(auto_now_add=True)
