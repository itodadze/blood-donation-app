from rest_framework import serializers

from api.models import User, UserIcon


class UserIconSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserIcon
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    loc_longitude = serializers.FloatField()
    loc_latitude = serializers.FloatField()
    blood_txt = serializers.SerializerMethodField("get_blood_str")

    class Meta:
        model = User
        fields = "__all__"

    def get_blood_str(self, obj) -> serializers.CharField:
        result = obj.blood_type.blood_type
        if obj.blood_type.rhesus_factor:
            result += "+"
        else:
            result += "-"
        return result


class UserResponseSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    loc_longitude = serializers.FloatField()
    loc_latitude = serializers.FloatField()
    blood_type = serializers.CharField()
    rhesus_factor = serializers.BooleanField()
    blood_narrative = serializers.CharField()
    donor_status = serializers.BooleanField()
    description = serializers.CharField()
    icon_path = serializers.CharField()
