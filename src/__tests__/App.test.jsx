import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import store from '../store';
import { WIDGET_ID } from '../Constants/';

describe('App tests', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <App widgetId={WIDGET_ID} />
      </Provider>,
      div,
    );
  });
});
