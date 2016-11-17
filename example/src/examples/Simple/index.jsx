import React from 'react';
import {Form, Field} from '../../../..';
import Control from '../../shared/Control';
import validate from './validate';

const initialValues = {
  message: 'I love your product so much!'
};

class SimpleExample extends React.Component {

  constructor(...args) {
    super(...args);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log('Submitting', values);
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.5) {
        reject(new Error('An error occurred whilst submitting the form!'));
      } else {
        resolve();
      }
    })
  }

  render() {
    return (
      <Form name="contact" validate={validate} initialValues={initialValues} onSubmit={this.handleSubmit}>
        <h1>Contact us</h1>

        <Field name="firstName">
          <Control label="First name:"/>
        </Field>

        <Field name="lastName">
          <Control label="Last name:"/>
        </Field>

        <Field name="email">
          <Control label="Email:"/>
        </Field>

        <Field name="message">
          <Control label="Message:" component="textarea"/>
        </Field>

        <button type="submit">Send</button>
      </Form>
    );
  }

}

export default SimpleExample;
