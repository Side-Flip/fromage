# Generated by Django 4.1 on 2024-10-12 02:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_apiproducto_table'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='apiproducto',
            table='fromaggio.productos',
        ),
    ]
