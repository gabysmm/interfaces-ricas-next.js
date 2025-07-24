from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated 
from .models import Character
from .serializers import CharacterSerializer

class CharacterViewSet(viewsets.ModelViewSet):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer
    permission_classes = [IsAuthenticated] 
                                        