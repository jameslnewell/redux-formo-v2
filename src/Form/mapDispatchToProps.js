import * as actions from '../actions';

export default (dispatch, {name}) => ({actions: Object.keys(actions).reduce(
  (mappedActions, actionName) => ({
    ...mappedActions,
    [actionName]: (...args) => dispatch(actions[actionName](name, ...args))
  }),
  {}
)});
