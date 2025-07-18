from django.db import models

class Character(models.Model):
    name = models.CharField(max_length=100)  
    anime = models.CharField(max_length=100)  
    description = models.TextField()  
    status = models.CharField(
        max_length=50,
        choices=[('vivo', 'Vivo'), ('falecido', 'Falecido')],  
        default='vivo'
    )

    def __str__(self):
        return self.name