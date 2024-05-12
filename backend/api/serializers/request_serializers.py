from rest_framework import serializers


class ReceiverRequestIdSerializer(serializers.Serializer):
    id = serializers.IntegerField(allow_null=False)
