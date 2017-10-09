# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
import logging

import boto3
import requests
from requests_aws_sign import AWSV4Sign

from django.conf import settings
from django.shortcuts import render


def format_response(data):
    return {
        'html': data['html'].encode('utf-8'),
        'initial': json.dumps(data['initialState'])
    }

def render_react(app, props=None):
    kwargs = {
        'headers': {'Content-Type': 'application/json'},
        'json': {'app': app, 'props': props or {}},
    }
    local = json.loads(settings.REACT_LOCAL)
    if not local:
        creds = boto3.session.Session().get_credentials()
        auth = AWSV4Sign(creds, 'us-east-1', 'execute-api')
        kwargs.update({'auth': auth})
        kwargs['json']['props'].update({'aws': 'direct'})
    resp = requests.post(settings.REACT_URL, **kwargs)
    return format_response(resp.json())


def index(request):
    context = {
        'app': 'lambda',
        'react': render_react('lambda', {'cool': 'story'}),
        'source': 'django',
    }
    return render(request, 'lambda/index.html', context)
