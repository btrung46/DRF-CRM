from django.contrib.auth.models import User
from django.shortcuts import render

from rest_framework import viewsets, filters
from rest_framework.response import Response

from team.models import Team
from .models import Lead
from .serializers import LeadSerializer


class LeadViewSet(viewsets.ModelViewSet):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()
    
    def get_queryset(self):
        team = Team.objects.filter(member__in = [self.request.user]).first()
        return self.queryset.filter(team = team)
    
    def perform_update(self, serializer):
        obj = self.get_object()

        member_id = self.request.data['assigned_to']

        if member_id:
            user = User.objects.get(pk=member_id)
            serializer.save(assigned_to=user)
        else:
            serializer.save()

    def perform_create(self, serializer):
        team = Team.objects.filter(member__in = [self.request.user]).first()
        serializer.save(team = team, created_by = self.request.user)
    
    