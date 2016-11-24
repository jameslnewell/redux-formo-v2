//@flow
import * as selectors from '../selectors';

type State = Object;
type FormProps = {
  name: string
};

export default (state : State, props : FormProps) => {
  const formName = props.name;

  const form = selectors.getForm(state, formName);
  const values = selectors.getFieldValues(state, formName);
  const errors = selectors.getFieldErrors(state, formName);

  return {
    error: form.error || null,
    submitting: form.submitting || false,
    submitted: form.submitted || false,
    values: values,
    errors: errors,
  };

};
