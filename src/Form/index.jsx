import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import diff from 'shallow-diff';

type Props = {
  name: string,
  destroyOnUnmount: ?boolean,
  onSubmit: ?(values: {[field]: any}) => Promise,
  children: any
};

export class Form extends React.Component {

  fields = [];

  constructor(props: Props, context) {
    super(props, context);

    //bind handlers
    this.handleSubmit = this.handleSubmit.bind(this);
    this.register = this.register.bind(this);
    this.unregister = this.unregister.bind(this);

  }

  getChildContext() {
    return {
      reduxFormoForm: {
        name: this.props.name,
        register: this.register,
        unregister: this.unregister
      }
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const difference = diff(this.props, nextProps);
    if (difference.unchanged.length !== 0) {
      delete difference.unchanged;
      console.log(`Form "${this.props.name}" changed?`, difference);
    }
  }

  componentWillUnmount() {
    const {destroyForm, name, destroyOnUnmount} = this.props;

    if (destroyOnUnmount) {
      destroyForm(name);
    }

  }

  register(field) {
    this.fields.push(field);
  }

  unregister(field) {
    const index = this.fields.indexOf(field);

    if (index !== -1) {
      this.fields.splice(index, 1);
    }

  }

  getName() {
    return this.props.name;
  }

  isValid() {
    return this.props.valid;
  }

  validate() {
    return Promise.all(this.fields.map(field => field.validate()));
  }

  handleSubmit(event) {
    event.preventDefault();

    const {submitForm, name, onSubmit} = this.props;
    this.validate()
      .then(() => {
        if (this.isValid()) {
          submitForm(name, onSubmit);
        }
      })
    ;

  }

  render() {
    const {

      name,
      destroyOnUnmount,
      onSubmit,

      error,
      submitting,
      submitted,
      valid,

      //actions
      destroyForm,
      submitForm,

      children: Component,
      ...otherProps
    } = this.props;

    if (typeof Component === 'function') {

      //e.g. <Form component={MyForm}/> OR <Form>{() => <div/>}</Form>
      return (
        <Component {...otherProps} onSubmit={this.handleSubmit}/>
      );

    } else {

      //e.g. <Form><div>...</div></Form>
      return (
        <form {...otherProps} onSubmit={this.handleSubmit}>{Component}</form>
      );

    }

  }

}

Form.childContextTypes = {
  reduxFormoForm: React.PropTypes.object
};

Form.propTypes = {
  name: React.PropTypes.string.isRequired,
  destroyOnUnmount: React.PropTypes.bool,
  onSubmit: React.PropTypes.func,
  children: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.func])
};

Form.defaultProps = {
  destroyOnUnmount: true,
  onSubmit: () => {/* do nothing */},
  children: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
