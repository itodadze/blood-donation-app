from rest_framework import serializers

from api.models import User, UserIcon, BloodType


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


class UserBloodTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodType
        fields = ['rhesus_factor', 'blood_type']


class UserResponseSerializer(serializers.ModelSerializer):
    icon = UserIconSerializer(read_only=True)
    blood_type = UserBloodTypeSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            'email',
            'first_name',
            'last_name',
            'loc_longitude',
            'loc_latitude',
            'blood_type',
            'donor_status',
            'description',
            'icon'
        ]


class UserUpdateRequestSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    icon_id = serializers.IntegerField(allow_null=True)
    first_name = serializers.CharField(allow_null=True)
    last_name = serializers.CharField(allow_null=True)
    email = serializers.CharField(allow_null=True)
    description = serializers.CharField(allow_null=True)
    loc_longitude = serializers.FloatField(allow_null=True)
    loc_latitude = serializers.FloatField(allow_null=True)
