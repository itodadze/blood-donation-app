from rest_framework import serializers

from api.models import ReceiverRequest


class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReceiverRequest
        fields = ('id', 'user', 'blood_type', 'description', 'search_status',
                  'emergency_status', 'loc_longitude', 'loc_latitude', 'request_date')


class FilterSearchRequestSerializer(serializers.Serializer):
    blood_id = serializers.UUIDField()
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
