from django.shortcuts import render
from rest_framework import viewsets
from .models import Team
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TeamSerializer
from django.contrib.auth.models import User
# C reate your views here.

class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()
    
    def get_queryset(self):
        return self.queryset.filter(member__in = [self.request.user]).first()
    
    def perform_create(self, serializer):
        obj = serializer.save(created_by= self.request.user)
        obj.member.add(self.request.user)
        obj.save()
@api_view(['GET'])
def get_my_team(request):
    team = Team.objects.filter(member__in = [request.user]).first()
    serializer = TeamSerializer(team)

    return Response(serializer.data)  

@api_view(['POST'])
def add_member(request):
    team = Team.objects.filter(member__in=[request.user]).first()
    email = request.data['email']

    print('Email', email)

    user = User.objects.get(username=email)

    team.member.add(user)
    team.save()

    return Response()