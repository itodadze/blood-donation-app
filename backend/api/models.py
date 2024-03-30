from django.db import models


class Blood_Types(models.Model):
    blood_type = models.CharField(max_length=2)
    rhesus_factor = models.BooleanField()
    narrative = models.CharField(max_length=50)


class User_Icons(models.Model):
    file_address = models.CharField(max_length=200)


class Users(models.Model):
    email = models.EmailField(max_length=200, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    password_hash = models.CharField(max_length=200)
    birthday = models.DateField()
    loc_longitude = models.FloatField()
    loc_latitude = models.FloatField()
    blood_type = models.ForeignKey(Blood_Types, on_delete=models.CASCADE, null=True)
    donor_status = models.BooleanField(default=False)
    description = models.ForeignKey(User_Icons, on_delete=models.CASCADE, null=True)
    icon_id = models.BigIntegerField(null=True, blank=True)
    register_date = models.DateField(auto_now_add=True)


class Chats(models.Model):
    donor_id = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='+')
    receiver_id = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='+')
    start_date = models.DateField(auto_now_add=True)
    valid_status = models.BooleanField(default=True)


class Messages(models.Model):
    chat_id = models.ForeignKey(Chats, on_delete=models.CASCADE)
    sender_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    message_text = models.CharField(max_length=250)
    message_status = models.CharField(max_length=20)
    message_timestamp = models.DateTimeField(auto_now_add=True)


class Instructions(models.Model):
    instruction_text = models.CharField(max_length=1000)


class Medical_Documents(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    upload_date = models.DateField(auto_now_add=True)
    valid_status = models.BooleanField(default=True)
    file_address = models.CharField(max_length=200)
    description = models.CharField(max_length=500)


class Receiver_Request_Hist(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    blood_type = models.ForeignKey(Blood_Types, on_delete=models.CASCADE)
    description = models.CharField(max_length=500, null=True, blank=True)
    search_status = models.BooleanField(default=True)
    emergency_status = models.BooleanField(default=True)
    loc_longitude = models.FloatField()
    loc_latitude = models.FloatField()
    request_date = models.DateField(auto_now_add=True)
    request_timestamp = models.DateTimeField(auto_now_add=True)
    accept_timestamp = models.DateTimeField(null=True)


class Donation_History(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    donation_date = models.DateField(auto_now_add=True)
    request_timestamp = models.DateTimeField()
    accept_timestamp = models.DateTimeField(auto_now_add=True)




