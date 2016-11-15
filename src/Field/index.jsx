//@flow
import React from 'react';
import ConnectedField from './ConnectedField';

/*
  This component solely exists to get the form context and pass it down to a connected component (because mapStateToProps()
    doesn't have access to the context) because form name is required to get the field
 */

const Field = (props, context) => {
  const {name: formName, validate} = context.formo;
  const {name: fieldName, ...otherProps} = props;
  return (
    <ConnectedField
      {...otherProps}
      formName={formName}
      fieldName={fieldName}
      validate={validate[fieldName]}
    />
  );
};

Field.contextTypes = {
  formo: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    validate: React.PropTypes.object.isRequired
  }).isRequired
};

Field.propTypes = {
  name: React.PropTypes.string.isRequired
};

export default Field;
