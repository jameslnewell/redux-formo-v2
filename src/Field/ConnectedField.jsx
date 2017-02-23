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
  constructor(props, ...args) {
    super(props, ...args);

    //bind the handlers
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    const {initField, formName, fieldName, initialValue} = this.props;
    initField(formName, fieldName, initialValue);
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
    const {focusField, formName, fieldName} = this.props;

    //focus the field
    focusField(formName, fieldName);

    //let the user to handle the event
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(event);
    }

  }

  /**
   * Handle field blur
   */
  handleBlur() {
    const {blurField, formName, fieldName} = this.props;

    //blur the field
    blurField(formName, fieldName);

    //validate the field
    if (this.props.validateOn === 'blur') {
      this.validate();
    }

    //let the user to handle the event
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event);
    }

  }

  /**
   * Handle field change
   */
  handleChange(event) {
    const {changeField, formName, fieldName} = this.props;

    //get the field value
    let value;
    if (event.target) {
      value = event.target.value;
    } else {
      value = event;
    }

    //change the field
    changeField(formName, fieldName, value);

    //validate the field
    if (this.props.validateOn === 'change') {
      this.validate();
    }

    //let the user to handle the event
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event);
    }

  }

  getName() {
    return this.props.fieldName;
  }

  isValid() {
    return this.props.valid;
  }

  reset(value) {
    const {resetField, formName, fieldName} = this.props;
    resetField(formName, fieldName, value);
  }

  validate() {
    const {validateField, formName, fieldName, validate} = this.props;
    return validateField(formName, fieldName, validate);
    //TODO: onValid()/onError()
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
      onValid,
      onError,

      //actions
      initField,
      resetField,
      focusField,
      blurField,
      changeField,
      validateField,

      //children
      children,

      ...otherProps
    } = this.props;

    const domProps = {
      name: `${formName}.${fieldName}`,
      value: value || '',
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onChange: this.handleChange
    };

    const componentProps = {

      initialised: false,
      active: false,
      validating: false,
      validated: false,

      ...domProps,
      ...otherProps

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
  validateOn: 'blur',
  validate: () => {/*do nothing*/},
  onValid: () => {/*do nothing*/},
  onError: () => {/*do nothing*/},
  children: 'input'
};

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(ConnectedField);
