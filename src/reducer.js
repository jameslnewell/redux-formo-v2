//@flow
import type {Reducer} from 'redux';
import {combineReducers} from 'redux';
import * as constants from './constants';

export const active : Reducer<boolean, Action> = (state = false, action) => {
  switch (action.type) {

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

    case constants.FIELD_VALIDATE_OK:
      return true;

    default:
      return state;

  }
};

export const meta = combineReducers({
  active,
  validating,
  validated
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
    return {
      ...state,
      [action.meta.field]: meta(state[action.meta.field], action)
    };
  } else {
    return state;
  }
};

export const valuesByField : Reducer<Object, Action> = (state = {}, action) => {
  if (action.meta && action.meta.field) {
    const fieldName = action.meta.field;
    switch (action.type) {

      case constants.FIELD_INIT:
        if (!state[fieldName]) {
          return {
            ...state,
            [action.meta.field]: action.payload
          };
        }
        break;

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
    switch (action.type) {

      case constants.FORM_DESTROY:
        const newState = {};
        Object.keys(state).forEach(key => {
          if (key !== action.meta.form) {
            newState[key] = state[key];
          }
        });
        return newState;

      default:
        return {
          ...state,
          [action.meta.form]: form(state[action.meta.form], action)
        };
    }
  } else {
    return state;
  }
};

export default reducer;
