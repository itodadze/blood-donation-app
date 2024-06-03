from rest_framework import serializers


class DonorSerializer(serializers.Serializer):
    donor = serializers.IntegerField(allow_null=False)


class AmountSerializer(serializers.Serializer):
    amount = serializers.IntegerField(allow_null=False)
