//@flow
import * as selectors from '../selectors';

type State = Object;
type FieldProps = {
  formName: string,
  fieldName: string
};

export default (state: State, props: FieldProps) => {
  const formName = props.formName;
  const fieldName = props.fieldName;

  const meta = selectors.getFieldMeta(state, formName, fieldName);
  const error = selectors.getFieldError(state, formName, fieldName);
  const valid = selectors.isFieldValid(state, formName, fieldName);

  let value = selectors.getFieldValue(state, formName, fieldName);

  //if the form hasn't been initialised yet, use the default value so that the value is correct when server rendering
  if (!meta.initialised && typeof value === 'undefined') {
    value = props.defaultValue;
  }

  return {
    ...meta, error, valid, value
  };
}
