import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import diff from 'shallow-diff';

export class Form extends React.Component {

  constructor(props, context) {
    super(props, context);

    //bind handlers
    this.handleSubmit = this.handleSubmit.bind(this);
    this.register = this.register.bind(this);
    this.unregister = this.unregister.bind(this);

    this._validate = {};
  }

  getChildContext() {
    return {
      formo: {
        name: this.props.name,
        register: this.register,
        unregister: this.unregister
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const difference = diff(this.props, nextProps);
    if (difference.unchanged.length !== 0) {
      delete difference.unchanged;
      console.log(`Form "${this.props.name}" changed?`, difference);
    }
  }

  register(fieldName, validate) {
    this._validate[fieldName] = validate;
  }

  unregister(fieldName) {
    delete this._validate[fieldName];
  }

  validate() {
    return Promise.all(
      Object.keys(this._validate)
        .map(fieldName => this.props.actions.validate(fieldName, this._validate[fieldName]))
    )
      .then(results => results.reduce((accum, valid) => accum && valid, true))
    ;
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('default prevented');

    //validate each field and submit the form
    this.validate()
      .then(valid => {
        if (valid) {
          this.props.actions.submit(this.props.onSubmit);
        }
      })
    ;

  }


  render() {
    const {name, validate, actions, children: Component, onSubmit, ...otherProps} = this.props;

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
  formo: React.PropTypes.object
};

Form.propTypes = {
  name: React.PropTypes.string.isRequired,
  onSubmit: React.PropTypes.func,
  children: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.func])
};

Form.defaultProps = {
  onSubmit: () => {/* do nothing */},
  children: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
