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
  const value = selectors.getFieldValue(state, formName, fieldName) || props.defaultValue || null;

  return {
    ...meta, error, valid, value
  };
}
