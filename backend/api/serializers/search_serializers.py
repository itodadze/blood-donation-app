from rest_framework import serializers

from api.models import ReceiverRequest, BloodType


class SearchSerializer(serializers.ModelSerializer):
    loc_longitude = serializers.FloatField()
    loc_latitude = serializers.FloatField()
    blood_txt = serializers.SerializerMethodField('get_blood_str')

    class Meta:
        model = ReceiverRequest
        fields = ('id', 'user', 'blood_type', 'description', 'search_status',
                  'emergency_status', 'loc_longitude', 'loc_latitude', 'request_date',
                  'blood_txt')

    def get_blood_str(self, obj) -> serializers.CharField:
        result = obj.blood_type.blood_type
        if obj.blood_type.rhesus_factor:
            result += "+"
        else:
            result += "-"
        return result


class FilterSearchRequestSerializer(serializers.Serializer):
    narrative = serializers.CharField(allow_null=True)
    exact_match = serializers.BooleanField(default=False)


class FilterUsersRequestSerializer(serializers.Serializer):
    blood_id = serializers.UUIDField(allow_null=True)
    name = serializers.CharField(max_length=101, allow_blank=True)


class BroadcastSearchSerializer(serializers.Serializer):
    user_id = serializers.UUIDField()
    blood_id = serializers.UUIDField()
    description = serializers.CharField()
    emergency_status = serializers.BooleanField()
    loc_longitude = serializers.FloatField()
    loc_latitude = serializers.FloatField()
