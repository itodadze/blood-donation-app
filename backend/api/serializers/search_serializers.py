from rest_framework import serializers

from api.models import ReceiverRequest


class FilterSearchRequestSerializer(serializers.Serializer):
    blood_id = serializers.UUIDField()
    top_left_x = serializers.FloatField()
    top_left_y = serializers.FloatField()
    bottom_right_x = serializers.FloatField()
    bottom_right_y = serializers.FloatField()
    exact_match = serializers.BooleanField(default=False)


class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReceiverRequest
        fields = ('id', 'user', 'blood_type', 'description', 'search_status',
                  'emergency_status', 'loc_longitude', 'loc_latitude', 'request_date')
