//@flow
import type {Dispatch} from 'redux';
import * as constants from './constants';
import * as selectors from './selectors';

export const focus = (form : string, field : string) : Action => ({
  type: constants.FIELD_FOCUS,
  meta: {
    form,
    field
  }
});

export const blur = (form : string, field : string) : Action => ({
  type: constants.FIELD_BLUR,
  meta: {
    form,
    field
  }
});

export const change = (form : string, field : string, value : mixed) : Action => ({
  type: constants.FIELD_CHANGE,
  meta: {
    form,
    field
  },
  payload: value
});

const startValidating = (form : string, field : string) : Action => ({
  type: constants.FIELD_VALIDATE,
  meta: {
    form,
    field
  }
});

const finishValidating = (form : string, field : string, result) : Action => ({
  type: constants.FIELD_VALIDATE_OK,
  meta: {
    form,
    field
  },
  payload: result
});

const errorValidating = (form : string, field : string, error) : Action => ({
  type: constants.FIELD_VALIDATE_ERR,
  meta: {
    form,
    field
  },
  payload: error && error.stack || String(error)
});

export const validate = (form : string, field : string, fn : ValidateFunction) => (dispatch : Dispatch<Action>, getState : GetState) => {

  const state = getState();
  const value = selectors.getFieldValue(state, form, field);
  const values = selectors.getFieldValues(state, form);

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
          dispatch(errorValidating(form, field, result));
        } else {
          dispatch(finishValidating(form, field, result));
        }

        return !Boolean(result);
      },
      error => {

        //don't bother entering the validating state when the promise resolves instantly
        clearTimeout(timeout);

        //complete the validation
        dispatch(errorValidating(form, field, error));

        return false;
      }
    )
  ;

};

const startSubmitting = (form : string) : Action => ({
  type: constants.FORM_SUBMIT,
  meta: {
    form
  }
});

const finishSubmitting = (form : string) : Action => ({
  type: constants.FORM_SUBMIT_OK,
  meta: {
    form
  }
});

const errorSubmitting = (form : string, error : any) : Action => ({
  type: constants.FORM_SUBMIT_ERR,
  meta: {
    form
  },
  payload: error && error.stack || String(error)
});

export const submit = (form : string, fn : SubmitFunction) => (dispatch : Dispatch<Action>, getState : GetState) => {

  const state = getState();
  const values = selectors.getFieldValues(state, form);

  //enter the submitting state when promise doesn't resolve immediately
  const timeout = setTimeout(
    () => dispatch(startSubmitting(form)),
    0
  );

  //call the user's submit function and handle any synchronous errors whilst validating
  let promise = null;
  try {
    promise = fn(values);
  } catch (error) {
    promise = Promise.reject(error);
  }

  //resolve the result of the user's submit function
  return Promise.resolve(promise)
    .then(
      () => {

        //don't bother entering the submitting state when the promise resolves instantly
        clearTimeout(timeout);

        //complete the submisison
        dispatch(finishSubmitting(form));

      },
      error => {

        //don't bother entering the submitting state when the promise resolves instantly
        clearTimeout(timeout);

        console.log('submitting', error)
        dispatch(errorSubmitting(form, error));

      }
    )
  ;

};
