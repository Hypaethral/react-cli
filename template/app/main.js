import React from 'react';
import {hashHistory} from 'react-router';
import ReactDOM from 'react-dom';
import Root from './root.js';

const rootEl = document.getElementById('root');

ReactDOM.render(<Root history={hashHistory} />, rootEl);