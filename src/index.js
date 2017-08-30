// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getSocket from './Sockets/';
// import openSocket from 'socket.io-client';
// import { processNewScores, processNewMessages } from './Actions/index';
import rootReducer from './Reducers/';
import store from './store';
import { WIDGET_ID } from './Constants/';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
/* eslint-disable react/jsx-filename-extension */

ReactDOM.render(
  <Provider store={store}>
    <App widgetId={WIDGET_ID} />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

getSocket();

export default App;
export { rootReducer };
