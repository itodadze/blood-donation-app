from django.db import migrations


def populate_data(apps, schema_editor):
    BloodType = apps.get_model("api", "BloodType")
    BloodType.objects.all().delete()
    BloodType.objects.create(
        blood_type="O",
        rhesus_factor=False,
        narrative="პირველი უარყოფითი",
        icon_path="/o_n.svg",
    )
    BloodType.objects.create(
        blood_type="O",
        rhesus_factor=True,
        narrative="პირველი დადებითი",
        icon_path="/o_p.svg",
    )
    BloodType.objects.create(
        blood_type="A",
        rhesus_factor=False,
        narrative="მეორე უარყოფითი",
        icon_path="/a_n.svg",
    )
    BloodType.objects.create(
        blood_type="A",
        rhesus_factor=True,
        narrative="მეორე დადებითი",
        icon_path="/a_p.svg",
    )
    BloodType.objects.create(
        blood_type="B",
        rhesus_factor=False,
        narrative="მესამე უარყოფითი",
        icon_path="/b_n.svg",
    )
    BloodType.objects.create(
        blood_type="B",
        rhesus_factor=True,
        narrative="მესამე დადებითი",
        icon_path="/b_p.svg",
    )
    BloodType.objects.create(
        blood_type="AB",
        rhesus_factor=False,
        narrative="მეოთხე უარყოფითი",
        icon_path="/ab_n.svg",
    )
    BloodType.objects.create(
        blood_type="AB",
        rhesus_factor=True,
        narrative="მეოთხე დადებითი",
        icon_path="/ab_p.svg",
    )


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_add_user_icons"),
    ]

    operations = [
        migrations.RunPython(populate_data),
    ]
