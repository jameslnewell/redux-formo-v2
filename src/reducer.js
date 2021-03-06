//@flow
import type {Reducer} from 'redux';
import {combineReducers} from 'redux';
import * as constants from './constants';

const omit = (object, key) => {
  const newState = {};
  Object.keys(object).forEach(k => {
    if (k !== key) {
      newState[k] = object[k];
    }
  });
  return newState;
};

export const initialised : Reducer<boolean, Action> = (state = false, action) => {
  switch (action.type) {

    case constants.FIELD_INIT:
      return true;

    case constants.FIELD_RESET:
      return false;

    default:
      return state;

  }
};

export const active : Reducer<boolean, Action> = (state = false, action) => {
  switch (action.type) {

    case constants.FIELD_RESET:
      return false;

    case constants.FIELD_FOCUS:
      return true;

    case constants.FIELD_BLUR:
      return false;

    default:
      return state;

  }
};

export const validating : Reducer<boolean, Action> = (state = false, action) => {
  switch (action.type) {

    case constants.FIELD_RESET:
      return false;

    case constants.FIELD_VALIDATE:
      return true;

    case constants.FIELD_VALIDATE_OK:
    case constants.FIELD_VALIDATE_ERR:
      return false;

    default:
      return state;

  }
};

export const validated : Reducer<boolean, Action> = (state = false, action) => {
  switch (action.type) {

    case constants.FIELD_RESET:
      return false;

    case constants.FIELD_VALIDATE_OK:
      return true;

    default:
      return state;

  }
};

export const initialValue : Reducer<boolean, Action> = (state = null, action) => {
  switch (action.type) {

    case constants.FIELD_INIT:
      if (typeof action.payload !== 'undefined') {
        return action.payload;
      } else {
        return state;
      }

    default:
      return state;

  }
};

export const meta = combineReducers({
  active,
  validating,
  validated,
  initialised,
  initialValue
});

export const submitting : Reducer<boolean, Action> = (state = false, action) => {
  switch (action.type) {

    case constants.FORM_SUBMIT:
      return true;

    case constants.FORM_SUBMIT_OK:
      return false;

    case constants.FORM_SUBMIT_ERR:
      return false;

    default:
      return state;

  }
};

export const submitted : Reducer<boolean, Action> = (state = false, action) => {
  switch (action.type) {

    case constants.FORM_SUBMIT_OK:
      return true;

    default:
      return state;

  }
};

export const error : Reducer<?string, Action> = (state = null, action) => {
  switch (action.type) {

    case constants.FORM_SUBMIT_OK:
      return null;

    case constants.FORM_SUBMIT_ERR:
      return action.payload;

    default:
      return state;

  }
};

export const metaByField : Reducer<Object, Action> = (state = {}, action) => {
  if (action.meta && action.meta.field) {
    const fieldName = action.meta.field;
    switch (action.type) {

      default:
        return {
          ...state,
          [fieldName]: meta(state[fieldName], action)
        };

    }
  } else {
    return state;
  }
};

export const valuesByField : Reducer<Object, Action> = (state = {}, action) => {
  if (action.meta && action.meta.field) {
    const fieldName = action.meta.field;
    switch (action.type) {

      case constants.FIELD_INIT:
      case constants.FIELD_CHANGE:
        if (state[fieldName] !== action.payload) {
          return {
            ...state,
            [action.meta.field]: action.payload
          };
        }
        break;

    }
  }
  return state;
};

export const errorsByField : Reducer<Object, Action> = (state = {}, action) => {
  if (action.meta && action.meta.field) {
    const fieldName = action.meta.field;
    switch (action.type) {

      case constants.FIELD_VALIDATE_OK:
        if (state[fieldName] !== null) {
          return {
            ...state,
            [fieldName]: null
          };
        }
        break;

      case constants.FIELD_VALIDATE_ERR:
        if (state[fieldName] !== action.payload) {
          return {
            ...state,
            [action.meta.field]: action.payload
          };
        }
        break;

    }
  }
  return state;
};

export const form = combineReducers({
  submitting,
  submitted,
  error,
  metaByField,
  valuesByField,
  errorsByField
});

const reducer : Reducer<Object, Action> = (state = {}, action) => {
  if (action.meta && action.meta.form) {
    const formName = action.meta.form;
    switch (action.type) {

      case constants.FORM_DESTROY:
        return omit(state, formName);

      default:
        return {
          ...state,
          [formName]: form(state[formName], action)
        };
    }
  } else {
    return state;
  }
};

export default reducer;
