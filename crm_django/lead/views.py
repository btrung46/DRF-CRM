from django.contrib.auth.models import User
from django.shortcuts import render

from rest_framework import viewsets, filters
from rest_framework.response import Response


from .models import Lead
from .serializers import LeadSerializer


class LeadViewSet(viewsets.ModelViewSet):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()
    
    def get_queryset(self):
        return self.queryset.filter(created_by = self.request.user)
    def perform_create(self, serializer):
        serializer.save(created_by = self.request.user)
    
    