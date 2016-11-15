
import {
  FIELD_SET_ACTOVE,
  FIELD_SET_DIRTY,
  FIELD_SET_VALUE,
  FIELD_START_VALIDATING,
  FIELD_FINISH_VALIDATING,
  FIELD_ERROR_VALIDATING
} from './constants';

import {
  getValue,
  getValues
} from './selectors';

export const setActive = (form, field, active) => ({
  type: FIELD_SET_ACTOVE,
  meta: {
    form,
    field
  },
  payload: active
});

export const setDirty = (form, field, dirty) => ({
  type: FIELD_SET_DIRTY,
  meta: {
    form,
    field
  },
  payload: dirty
});

export const setValue = (form, field, value) => ({
  type: FIELD_SET_VALUE,
  meta: {
    form,
    field
  },
  payload: value
});

const startValidating = (form, field) => ({
  type: FIELD_START_VALIDATING,
  meta: {
    form,
    field
  }
});

const finishValidating = (form, field, result) => ({
  type: FIELD_FINISH_VALIDATING,
  meta: {
    form,
    field
  },
  payload: result
});

const errorValidating = (form, field, error) => ({
  type: FIELD_ERROR_VALIDATING,
  meta: {
    form,
    field
  },
  payload: error
});

export const validate = (form, field, fn) => (dispatch, getState) => {

  const state = getState();
  const value = getValue(form, field)(state);
  const values = getValues(form)(state);

  //enter the validating state when promise doesn't resolve immediately
  const timeout = setTimeout(
    () => dispatch(startValidating(form, field)),
    0
  );

  //call the user's validate function and handle any synchronous errors whilst validating
  let promise = null;
  try {
    promise = fn(value, values);
  } catch (error) {
    promise = error;
  }

  //resolve the result of the user's validate function
  return Promise.resolve(promise)
    .then(
      result => {

        //don't bother entering the validating state when the promise resolves instantly
        clearTimeout(timeout);

        if (result === true) {

          //complete the validation
          dispatch(finishValidating(form, field, result));

        } else {

          //complete the validation
          dispatch(errorValidating(form, field, result));

        }

        return result === true;
      },
      error => {

        //don't bother entering the validating state when the promise resolves instantly
        clearTimeout(timeout);

        //complete the validation
        dispatch(errorValidating(form, field, error));

        throw error;
      }
    )
  ;

};
