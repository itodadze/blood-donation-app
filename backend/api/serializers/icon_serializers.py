from rest_framework import serializers


class UserIconSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(allow_null=False)
    icon_id = serializers.IntegerField(allow_null=True)
