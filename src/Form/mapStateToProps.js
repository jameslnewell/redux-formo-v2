import {getForm} from '../selectors';

export default (state, ownProps) => {
  const form = getForm(ownProps.name)(state);
  return {
    name: ownProps.name
  };
};
