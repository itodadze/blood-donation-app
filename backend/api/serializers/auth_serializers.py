from rest_framework import serializers

from api.models import User


class RegisterUserSerializer(serializers.ModelSerializer):
    birthday = serializers.DateField(input_formats=['%d/%m/%Y'])
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'birthday', 'loc_longitude', 'loc_latitude', 'blood_type',
                  'donor_status', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
