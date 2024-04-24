from django.shortcuts import render
from rest_framework import viewsets,status
from .models import Team
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404, HttpResponse
from .serializers import TeamSerializer,UserSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
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

class UserDetail(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)