from rest_framework import serializers


class ChatPeopleRequestSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(allow_null=False)


class ChatMessagesRequestSerializer(serializers.Serializer):
    logged_in_user_id = serializers.IntegerField(allow_null=False)
    chat_user_id = serializers.IntegerField(allow_null=False)


class ChatNewMessageRequestSerializer(serializers.Serializer):
    sender_id = serializers.IntegerField(allow_null=False)
    receiver_id = serializers.IntegerField(allow_null=False)
    message_text = serializers.CharField()


class ChatPeopleResponseSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()


class ChatMessagesResponseSerializer(serializers.Serializer):
    sender_id: serializers.IntegerField()
    message_text: serializers.CharField()
    message_status: serializers.CharField()
    message_timestamp: serializers.DateTimeField()
