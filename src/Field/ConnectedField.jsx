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

  constructor(props, context) {
    super(props, context);

    //bind the handlers
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('ConnectedField shallow equal test', diff(this.props, nextProps));
  // }
  //
  // shouldComponentUpdate(nextProps) {
  //   console.log(Object.keys(nextProps).length, diff(this.props, nextProps).unchanged.length)
  //   return Object.keys(nextProps).length !== diff(this.props, nextProps).unchanged.length;
  // }

  /**
   * Validate the input
   * @returns {Promise}
   */
  validate() {
    return this.props.actions.validate(this.props.validate);
  }

  /**
   * Handle input focus
   */
  handleFocus() {
    this.props.actions.setActive(true);
  }

  /**
   * Handle input blur
   */
  handleBlur() {
    this.props.actions.setActive(false);

    //validate the input
    if (this.props.validateOn === 'blur') {
      this.validate();
    }

  }

  /**
   * Handle input change
   */
  handleChange(event) {

    //get the input value
    let value;
    if (event.target) {
      value = event.target.value;
    } else {
      value = event;
    }

    //set the input value and mark the input as dirty
    this.props.actions.setValue(value);
    this.props.actions.setDirty(true);

    //validate the input
    if (this.props.validateOn === 'change') {
      this.validate();
    }

  }

  render() {
    const {

      //props
      formName,
      fieldName,
      value,
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
      valid: false,

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

  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.func
  ])

};

ConnectedField.defaultProps = {
  validate: () => true,
  validateOn: 'blur',
  children: 'input'
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedField);
