from django.db import migrations


def populate_data(apps, schema_editor):
    UserIcon = apps.get_model("api", "UserIcon")
    UserIcon.objects.all().delete()
    UserIcon.objects.create(file_address="icon_1")
    UserIcon.objects.create(file_address="icon_2")
    UserIcon.objects.create(file_address="icon_3")
    UserIcon.objects.create(file_address="icon_4")
    UserIcon.objects.create(file_address="icon_5")
    UserIcon.objects.create(file_address="icon_6")
    UserIcon.objects.create(file_address="icon_7")
    UserIcon.objects.create(file_address="icon_8")
    UserIcon.objects.create(file_address="icon_9")
    UserIcon.objects.create(file_address="icon_10")


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(populate_data),
    ]
