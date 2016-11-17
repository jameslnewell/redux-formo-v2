import React from 'react';
import {Form, Field} from '../../../../..';
import Control from '../../../shared/Control';
import validate from './validate';

class Form1 extends React.Component {

  constructor(...args) {
    super(...args);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log('Submitted #1:', values);
    this.props.onNext();
  }

  render() {
    return (
      <div>
        <h2>Form #1</h2>
        <Form name="form-1" validate={validate} onSubmit={this.handleSubmit.bind(this)}>

          <Field name="firstName">
            <Control label="First name:" autoFocus/>
          </Field>

          <Field name="lastName">
            <Control label="Last name:"/>
          </Field>

          <Field name="email">
            <Control label="Email:"/>
          </Field>

          <button>Next &gt;</button>

        </Form>
      </div>
    );
  }

}

export default Form1;
