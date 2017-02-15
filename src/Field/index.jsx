//@flow
import React from 'react';
import ConnectedField from './ConnectedField';

type Props = {
  name: string,
  validate: (value: any, values: {[field: string]: any}) => ?string,
  defaultValue: any,
  ref: (instance: any) => void
};

/*
  This component solely exists to get the form context and pass it down to a connected component (because mapStateToProps()
    doesn't have access to the context) because form name is required to get the field
 */

class Field extends React.Component {

  props: Props;

  connectedField: any;

  constructor(props: Props, ...args: any) {
    super(props, ...args);

    //bind the handlers
    this.handleRef = this.handleRef.bind(this);

  }

  handleRef = (ref: any) => {
    const connectedField = ref === null ? ref : ref.getWrappedInstance();

    //register/unregister the field
    this.connectedField = connectedField;
    if (connectedField) {
      this.context.reduxFormoForm.register(this.connectedField);
    } else {
      this.context.reduxFormoForm.unregister(this.connectedField);
    }

    //since we're overriding ref, if the parent component has passed us a ref, we'll pass their ref the instance too
    if (typeof this.props.ref === 'function') {
      this.props.ref(connectedField);
    }

  };

  render() {
    const {name: formName} = this.context.reduxFormoForm;
    const {name: fieldName, ...otherProps} = this.props;
    return (
      <ConnectedField
        {...otherProps}
        ref={this.handleRef}
        formName={formName}
        fieldName={fieldName}
      />
    );
  }

}

Field.contextTypes = {
  reduxFormoForm: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    register: React.PropTypes.func.isRequired,
    unregister: React.PropTypes.func.isRequired
  }).isRequired
};

export default Field;
