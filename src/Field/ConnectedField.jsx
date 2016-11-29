import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import diff from 'shallow-diff';

/*

  Validate on blur or change:
    - https://medium.com/wdstack/inline-validation-in-forms-designing-the-experience-123fb34088ce#.s2xbqklcg

 */

export class ConnectedField extends React.Component {

  /**
   * Construct the field
   */
  constructor(props, context) {
    super(props, context);

    //bind the handlers
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);

    //initialise the field
    if (this.props.initialValue) {
      this.props.actions.initialise(this.props.initialValue);
    }

  }

  //
  componentWillReceiveProps(nextProps) {
    const difference = diff(this.props, nextProps);
    if (difference.unchanged.length !== 0) {
      delete difference.unchanged;
      console.log(`Field "${this.props.fieldName}" changed?`, difference);
    }
  }

  /**
   * Handle field focus
   */
  handleFocus() {
    this.props.actions.focus();

    //allow the user to handle the event
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(event);
    }

  }

  /**
   * Handle field blur
   */
  handleBlur() {
    this.props.actions.blur();

    //allow the user to handle the event
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event);
    }

    //validate the field
    if (this.props.validateOn === 'blur') {
      console.log(this.props.validate);
      this.props.actions.validate(this.props.validate);
      //TODO: onValid()/onError()
    }

  }

  /**
   * Handle field change
   */
  handleChange(event) {

    //get the field value
    let value;
    if (event.target) {
      value = event.target.value;
    } else {
      value = event;
    }

    //change the field value
    this.props.actions.change(value);

    //allow the user to handle the event
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event);
    }

    //validate the field
    if (this.props.validateOn === 'change') {
      this.props.actions.validate(this.props.validate);
      //TODO: onValid()/onError()
    }

  }

  render() {
    const {

      //props
      formName,
      fieldName,
      value,
      initialValue,
      validate,
      validateOn,

      //actions
      actions,

      //children
      children,

      ...otherProps
    } = this.props;

    const domProps = {
      name: `${formName}.${fieldName}`,
      value: value === null || typeof value === 'undefined' ? '' : value,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onChange: this.handleChange
    };

    const componentProps = {

      active: false,
      validating: false,
      validated: false,
      valid: typeof otherProps.error === null,

      ...domProps,
      ...otherProps,

      valid: this.props.error === null || typeof this.props.error === 'undefined'

    };

    console.log(`render() ${formName}.${fieldName}`);

    if (React.isValidElement(children)) {
      if (typeof children.type === 'string') {

        //e.g. <Field><input/></Field>
        return React.cloneElement(children, domProps);

      } else {

        //e.g. <Field><MyComponent/></Field>
        return React.cloneElement(children, componentProps);

      }
    } else {

      //e.g. <Field>{() => <input/>}</Field>
      const Component = children;
      return (<Component {...componentProps}/>);

    }
  }

}

ConnectedField.propTypes = {

  formName: React.PropTypes.string.isRequired,
  fieldName: React.PropTypes.string.isRequired,

  validate: React.PropTypes.func,
  validateOn: React.PropTypes.oneOf(['change', 'blur']),

  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onChange: React.PropTypes.func,

  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.func
  ])

};

ConnectedField.defaultProps = {
  validate: () => {/*do nothing*/},
  validateOn: 'blur',
  children: 'input'
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedField);
