from rest_framework import serializers

from api.models import MedicalDocument


class MedicalDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalDocument
        fields = "__all__"
