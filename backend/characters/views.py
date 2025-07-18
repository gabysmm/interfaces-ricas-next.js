from rest_framework import viewsets
from .models import Character
from .serializers import CharacterSerializer

class CharacterViewSet(viewsets.ModelViewSet):
    queryset = Character.objects.all()  # Consulta todos os personagens
    serializer_class = CharacterSerializer  # Usa o serializer criado

# a classe ModelViewSet já fornece todo o CRUD necessário