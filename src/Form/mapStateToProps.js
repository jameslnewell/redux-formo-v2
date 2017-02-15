//@flow
import * as selectors from '../selectors';

type State = Object;
type FormProps = {
  name: string
};

export default (state: State, props: FormProps) => {
  const formName = props.name;

  const form = selectors.getForm(state, formName);
  const valid = selectors.isFormValid(state, formName);

  return {
    error: form.error || null,
    submitting: form.submitting || false,
    submitted: form.submitted || false,
    //TODO: add .validating? will impact perf making it re-render for almost every field
    valid
  };

};
