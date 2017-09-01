// @flow

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './Reducers/index';
import SLACK_API from './Utils/Api';

/* eslint-disable */
const store = createStore(
  rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware.withExtraArgument({ SLACK_API }))
  )

export default store;
