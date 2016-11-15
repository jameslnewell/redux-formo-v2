import {getFormField} from '../selectors';

export default (state, ownProps) => getFormField(ownProps.formName, ownProps.fieldName)(state);
