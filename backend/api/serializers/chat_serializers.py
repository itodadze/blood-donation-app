from rest_framework import serializers

from ..models import *


class ChatPeopleRequestSerializer(serializers.Serializer):
    user_email = serializers.EmailField(allow_null=False)


class ChatPeopleResponseSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = models.CharField()
    last_name = models.CharField()
