//@flow
import type {Dispatch} from 'redux';
import * as constants from '../constants';
import * as selectors from '../selectors';

export const initField = (form : string, field : string, value : string) : Action => ({
  type: constants.FIELD_INIT,
  meta: {
    form,
    field
  },
  payload: value
});

export const resetField = (form : string, field : string, value : string) : Action => ({
  type: constants.FIELD_RESET,
  meta: {
    form,
    field
  },
  payload: value
});

export const focusField = (form : string, field : string) : Action => ({
  type: constants.FIELD_FOCUS,
  meta: {
    form,
    field
  }
});

export const blurField = (form : string, field : string) : Action => ({
  type: constants.FIELD_BLUR,
  meta: {
    form,
    field
  }
});

export const changeField = (form : string, field : string, value : mixed) : Action => ({
  type: constants.FIELD_CHANGE,
  meta: {
    form,
    field
  },
  payload: value
});

const startValidatingField = (form : string, field : string) : Action => ({
  type: constants.FIELD_VALIDATE,
  meta: {
    form,
    field
  }
});

const finishValidatingField = (form : string, field : string, result) : Action => ({
  type: constants.FIELD_VALIDATE_OK,
  meta: {
    form,
    field
  },
  payload: result
});

const errorValidatingField = (form : string, field : string, error) : Action => ({
  type: constants.FIELD_VALIDATE_ERR,
  meta: {
    form,
    field
  },
  payload: error && error.stack || String(error)
});

export const validateField = (form : string, field : string, fn : ValidateFunction) => (dispatch : Dispatch<Action>, getState : GetState) => {

  const state = getState();
  const value = selectors.getFieldValue(state, form, field);
  const values = selectors.getFieldValues(state, form);

  //enter the validating state when promise doesn't resolve immediately
  const timeout = setTimeout(
    () => dispatch(startValidatingField(form, field)),
    0
  );

  //call the user's validate function and handle any synchronous errors whilst validating
  let promise = null;
  try {
    promise = fn(value, values);
  } catch (error) {
    promise = Promise.reject(error);
  }

  //resolve the result of the user's validate function
  return Promise.resolve(promise)
    .then(
      result => {

        //don't bother entering the validating state when the promise resolves instantly
        clearTimeout(timeout);

        //complete the validation
        if (result) {
          dispatch(errorValidatingField(form, field, result));
        } else {
          dispatch(finishValidatingField(form, field, result));
        }

        return !Boolean(result);
      },
      error => {

        //don't bother entering the validating state when the promise resolves instantly
        clearTimeout(timeout);

        //complete the validation
        dispatch(errorValidatingField(form, field, error));

        return false;
      }
    )
  ;

};
