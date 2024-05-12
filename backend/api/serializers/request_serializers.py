from rest_framework import serializers


class ReceiverRequestGetSerializer(serializers.Serializer):
    id = serializers.IntegerField(allow_null=False)
