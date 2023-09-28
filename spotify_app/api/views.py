from django.shortcuts import render
from .credentials import *
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response

class AuthURL(APIView):
    def get(self, request, format=None):
        authenticationScopes = ''

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scopes': authenticationScopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
        }).prepare().url

        return Response({'url': url, "status": status.HTTP_200_OK})