# Generated by Django 4.1 on 2024-10-12 01:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_apicliente_apidetallefactura_apifactura_apiproducto_and_more'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='apiproducto',
            table='producto',
        ),
    ]