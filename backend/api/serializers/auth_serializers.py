from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import serializers

from api.models import User


class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "email",
            "first_name",
            "last_name",
            "loc_longitude",
            "loc_latitude",
            "blood_type",
            "donor_status",
            "password",
            "password_confirm",
        ]

    def validate_birthday(self, value):
        from datetime import date

        today = date.today()
        if value >= today:
            raise serializers.ValidationError("Birthday must be in the past.")
        return value

    def validate_password(self, value):
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    def validate(self, data):
        if data["password"] != data["password_confirm"]:
            raise serializers.ValidationError(
                {"password_confirm": "Passwords do not match."}
            )
        return data

    def create(self, validated_data):
        validated_data.pop("password_confirm")
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return {
            "pk": user.pk,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "donor": user.donor_status,
        }


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    user = serializers.SerializerMethodField()

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(email=email, password=password)
            if not user:
                raise serializers.ValidationError(
                    "მომხმარებლის იმეილი ან პაროლი არასწორია"
                )
        else:
            raise serializers.ValidationError("იმეილიც და პაროლიც სავალდებულო ველებია")
        attrs["user"] = user
        return attrs

    def get_user(self, instance):
        user = instance.get("user")
        if user:
            return {
                "pk": user.pk,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "donor": user.donor_status,
            }
        return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user_data = self.get_user(instance)
        if user_data:
            representation["user"] = user_data
        return representation
