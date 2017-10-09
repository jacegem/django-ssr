import React from 'react';

import '../../css/index.css';

import createApp from './createApp';
import App from './app';
import reducer, { parseInitial } from './reducers';

createApp('lambda', App, reducer, parseInitial);
