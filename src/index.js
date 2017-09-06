// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from './Reducers/';
import SLACK_API from './Utils/Api';
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

export default App;
export { rootReducer, SLACK_API };
