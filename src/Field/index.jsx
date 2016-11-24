import React from 'react';
import ConnectedField from './ConnectedField';

/*
  This component solely exists to get the form context and pass it down to a connected component (because mapStateToProps()
    doesn't have access to the context) because form name is required to get the field
 */

class Field extends React.Component {

  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    this.context.formo.register(this.props.name, this.props.validate);
  }

  componentWillUpdate(nextProps) {
    this.context.formo.register(this.props.name, nextProps.validate);
  }

  componentWillUnmount() {
    this.context.formo.unregister(this.props.name);
  }

  render() {
    const {name: formName} = this.context.formo;
    const {name: fieldName, ...otherProps} = this.props;
    return (
      <ConnectedField
        {...otherProps}
        formName={formName}
        fieldName={fieldName}
      />
    );
  }

}

Field.contextTypes = {
  formo: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    register: React.PropTypes.func.isRequired,
    unregister: React.PropTypes.func.isRequired
  }).isRequired
};

Field.propTypes = {
  name: React.PropTypes.string.isRequired,
  validate: React.PropTypes.func
};

Field.defaultProps = {
  validate: () => {/* do nothing */}
};

export default Field;
