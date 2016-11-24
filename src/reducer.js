import {combineReducers} from 'redux';
import * as constants from './constants';

export const active = (state = false, action = {}) => {
  switch (action.type) {

    case constants.FIELD_FOCUS:
      return true;

    case constants.FIELD_BLUR:
      return false;

    default:
      return state;

  }
};

export const validating = (state = false, action = {}) => {
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

export const validated = (state = false, action = {}) => {
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

export const submitting = (state = false, action = {}) => {
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

export const submitted = (state = false, action = {}) => {
  switch (action.type) {

    case constants.FORM_SUBMIT_OK:
      return true;

    default:
      return state;

  }
};

export const error = (state = null, action = {}) => {
  switch (action.type) {

    case constants.FORM_SUBMIT_OK:
      return null;

    case constants.FORM_SUBMIT_ERR:
      return action.payload;

    default:
      return state;

  }
};

export const metaByField = (state = {}, action = {}) => {
  if (action.meta && action.meta.field) {
    return {
      ...state,
      [action.meta.field]: meta(state[action.meta.field], action)
    };
  } else {
    return state;
  }
};

export const valuesByField = (state = {}, action = {}) => {
  if (action.meta && action.meta.field) {
    const fieldName = action.meta.field;
    switch (action.type) {

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

export const errorsByField = (state = {}, action = {}) => {
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

export default (state = {}, action = {}) => {
  if (action.meta && action.meta.form) {
    return {
      ...state,
      [action.meta.form]: form(state[action.meta.form], action)
    };
  } else {
    return state;
  }
};
