import {combineReducers} from 'redux';
import {
  FIELD_SET_ACTOVE,
  FIELD_SET_DIRTY,
  FIELD_SET_VALUE,
  FIELD_START_VALIDATING,
  FIELD_FINISH_VALIDATING,
  FIELD_ERROR_VALIDATING
} from './constants';

export const setStateToPayloadReducer = (actionType, initialState) => (state = initialState, action = {}) => {
  switch (action.type) {

    case actionType:
      return action.payload;

    default:
      return state;

  }
};

export const active = setStateToPayloadReducer(FIELD_SET_ACTOVE, false);
export const dirty = setStateToPayloadReducer(FIELD_SET_DIRTY, false);

export const error = (state = null, action = {}) => {
  const {type, payload} = action;

  switch (type) {

    case FIELD_FINISH_VALIDATING:
      return null;

    case FIELD_ERROR_VALIDATING:
      return String(payload);

    default:
      return state;

  }

};

export const validating = (state = false, action = {}) => {
  const {type} = action;

  switch (type) {

    case FIELD_START_VALIDATING:
      return true;

    case FIELD_FINISH_VALIDATING:
    case FIELD_ERROR_VALIDATING:
      return false;

    default:
      return state;

  }

};

export const validated = (state = false, action = {}) => {
  const {type} = action;

  switch (type) {

    case FIELD_FINISH_VALIDATING:
      return true;

    default:
      return state;

  }

};

export const meta = combineReducers({
  active,
  dirty,
  error,
  validating,
  validated
});

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
    switch (action.type) {

      case FIELD_SET_VALUE:
        return {
          ...state,
          [action.meta.field]: action.payload
        };

      default:
        return state;

    }
  } else {
    return state;
  }
};

export const form = combineReducers({
  metaByField,
  valuesByField
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
