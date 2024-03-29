from django.db import models


class Blood_Types(models.Model):
    blood_type = models.CharField(max_length=1)
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
