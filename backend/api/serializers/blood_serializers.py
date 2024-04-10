from rest_framework import serializers

from api.models import BloodType


class BloodSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodType
        fields = "__all__"
