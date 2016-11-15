import * as actions from '../actions';

export default (dispatch, {formName, fieldName}) => ({actions: Object.keys(actions).reduce(
  (mappedActions, actionName) => ({
    ...mappedActions,
    [actionName]: (...args) => dispatch(actions[actionName](formName, fieldName, ...args))
  }),
  {}
)});
