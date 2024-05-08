from rest_framework import serializers
from ..models import *


class UserIconSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserIcon
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    loc_longitude = serializers.FloatField()
    loc_latitude = serializers.FloatField()
    blood_txt = serializers.SerializerMethodField('get_blood_str')

    class Meta:
        model = User
        fields = '__all__'

    def get_blood_str(self, obj) -> serializers.CharField:
        result = obj.blood_type.blood_type
        if obj.blood_type.rhesus_factor:
            result += "+"
        else:
            result += "-"
        return result


class UserResponseSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = models.CharField()
    last_name = models.CharField()
    loc_longitude = models.FloatField()
    loc_latitude = models.FloatField()
    blood_type = models.CharField()
    rhesus_factor = models.BooleanField()
    blood_narrative = models.CharField()
    donor_status = models.BooleanField()
    description = models.TextField()
    icon_path = models.CharField()
