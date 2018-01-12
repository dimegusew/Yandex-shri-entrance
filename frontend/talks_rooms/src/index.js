import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import registerServiceWorker from './registerServiceWorker';
import Router from './Router.js'



ReactDOM.render((
    <App/>
), document.getElementById('root'));
registerServiceWorker();
