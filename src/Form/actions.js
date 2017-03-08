//@flow
import type {Dispatch} from 'redux';
import * as constants from '../constants';
import * as selectors from '../selectors';

export const destroyForm = (form : string) => ({
  type: constants.FORM_DESTROY,
  meta: {
    form
  }
});

const startSubmittingForm = (form : string) : Action => ({
  type: constants.FORM_SUBMIT,
  meta: {
    form
  }
});

const finishSubmittingForm = (form : string) : Action => ({
  type: constants.FORM_SUBMIT_OK,
  meta: {
    form
  }
});

const errorSubmittingForm = (form : string, error : any) : Action => ({
  type: constants.FORM_SUBMIT_ERR,
  meta: {
    form
  },
  payload: error && error.stack || String(error)
});

export const submitForm = (form : string, fn : SubmitFunction) => (dispatch : Dispatch<Action>, getState : GetState) => {

  const state = getState();
  const values = selectors.getFieldValues(state, form); //FIXME: should only get values for registered fields

  //enter the submitting state when promise doesn't resolve immediately
  const timeout = setTimeout(
    () => dispatch(startSubmittingForm(form)),
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
        dispatch(finishSubmittingForm(form));

      },
      error => {

        //don't bother entering the submitting state when the promise resolves instantly
        clearTimeout(timeout);

        console.log('submitting', error)
        dispatch(errorSubmittingForm(form, error));

      }
    )
  ;

};
