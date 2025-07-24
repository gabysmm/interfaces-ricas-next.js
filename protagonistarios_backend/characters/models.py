from django.db import models

class Character(models.Model):
    STATUS_CHOICES = [
        ('vivo', 'Vivo'),
        ('morto', 'Morto'),
    ]

    name = models.CharField(max_length=100)
    anime = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='vivo', 
    )

    def __str__(self):
        return self.name