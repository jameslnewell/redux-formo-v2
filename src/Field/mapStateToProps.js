import {getMeta, getValue} from '../selectors';

export default (state, props) => {
  const formName = props.formName;
  const fieldName = props.fieldName;
  return {
    ...getMeta(formName, fieldName)(state),
    value: getValue(formName, fieldName)(state)
  };
}
