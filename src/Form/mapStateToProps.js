import {getValues} from '../selectors';

export default (state, props) => {
  const formName = props.name;

  return {
    values: getValues(formName)(state)
  };

};
