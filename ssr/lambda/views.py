# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json

from django.shortcuts import render


def index(request):
    context = {
        'react': {
            'app': 'lambda',
            'html': '',
            'initial': json.dumps({'counter': 0}),
        },
        'source': 'django',
    }
    return render(request, 'lambda/index.html', context)
