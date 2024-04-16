from django.shortcuts import render
from rest_framework import viewsets
from .models import Team
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TeamSerializer
# C reate your views here.

class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()
    
    def get_queryset(self):
        return self.queryset.filter(created_by = self.request.user)
    
    def perform_create(self, serializer):
        obj = serializer.save(created_by= self.request.user)
        obj.member.add(self.request.user)
        obj.save()
@api_view(['GET'])
def get_my_team(request):
    team = Team.objects.filter(created_by = request.user).first()
    serializer = TeamSerializer(team)

    return Response(serializer.data)  