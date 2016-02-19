import React from 'react';
import History from './history.js';
import ReactDOM from 'react-dom';
import Root from './root.js';

const rootEl = document.getElementById('root');

ReactDOM.render(<Root history={History} />, rootEl);