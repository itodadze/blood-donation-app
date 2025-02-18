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


class ConversationCreateRequestSerializer(serializers.Serializer):
    receiver_id = serializers.IntegerField(allow_null=False)
    donor_id = serializers.IntegerField(allow_null=False)


class ConversationDeleteRequestSerializer(serializers.Serializer):
    receiver_id = serializers.IntegerField(allow_null=False)
    donor_id = serializers.IntegerField(allow_null=False)


class ChatPeopleResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    icon_file_address = serializers.CharField(allow_null=True)


class ChatMessagesResponseSerializer(serializers.Serializer):
    sender_id = serializers.IntegerField()
    message_text = serializers.CharField()
    message_status = serializers.CharField()
    message_timestamp = serializers.DateTimeField()


class ConversationResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
