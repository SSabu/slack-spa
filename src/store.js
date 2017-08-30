// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './Reducers/index';

/* eslint-disable */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

/* eslint-disable */
// store.subscribe(() => {
//   console.log('State: ', store.getState());
// });

// TODO: remove
window.store = store;

export default store;
