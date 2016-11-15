import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';

export class Form extends React.Component {

  constructor(props, context) {
    super(props, context);

    //bind handlers
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  getChildContext() {
    return {
      formo: {
        name: this.props.name,
        validate: this.props.validate
      }
    };
  }

  componentWillMount() {
    this.initialise();
  }

  componentWillReceiveProps(nextProps) {
    console.log('shallow equal test', this.props.values === nextProps.values);
  }

  initialise() {
    return Promise.all(
      Object.keys(this.props.validate)
        .map(fieldName => this.props.actions.setValue(fieldName, this.props.initialValues[fieldName]))
    )
      .then(() => console.log('inited', this.props.validate, this.props.initialValues))
      .catch(err => console.log(err))
    ;
  }

  validate() {
    return Promise.all(
      Object.keys(this.props.validate)
        .map(fieldName => this.props.actions.validate(fieldName, this.props.validate[fieldName]))
    )
      .then(results => results.reduce((accum, valid) => accum && valid, true))
    ;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.validate()
      .then(valid => {

        if (valid) {
          this.props.onSubmit(this.props.values);
        }

      })
    ;
  }

  render() {
    const {name, validate, children: Component, ...otherProps} = this.props;

    if (typeof Component === 'function') {

      //e.g. <Form component={MyForm}/> OR <Form>{() => <div/>}</Form>
      return (
        <Component {...otherProps}/>
      );

    } else {

      //e.g. <Form><div>...</div></Form>
      return (
        <form onSubmit={this.handleSubmit}>{Component}</form>
      );

    }

  }

}

Form.childContextTypes = {
  formo: React.PropTypes.object
};

Form.propTypes = {
  name: React.PropTypes.string.isRequired,
  validate: React.PropTypes.object,
  initialValues: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  children: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.func])
};

Form.defaultProps = {
  validate: {},
  initialValues: {},
  onSubmit: () => {/* do nothing */},
  children: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
