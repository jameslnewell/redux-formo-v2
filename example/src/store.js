import React from 'react';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer} from 'redux-formo';

/*
 Create a `redux` store:
 - use the `redux-formo` reducer
 - use the `redux-thunk` middleware
 */
export default createStore(
  combineReducers({forms: reducer}),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension()
  )
);
