import React from 'react';
import {Form, Field} from '../../../..';
import Control from '../../shared/Control';
import validate from './validate';

class SimpleExample extends React.Component {

  constructor(...args) {
    super(...args);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log('Submitting', values);
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.5) {
        setTimeout(() => reject(new Error('An error occurred whilst submitting the form!')), 1000);
      } else {
        setTimeout(resolve, 100);
      }
    });
  }

  render() {
    return (
      <Form name="contact" onSubmit={this.handleSubmit}>
        {({error, submitting, submitted, onSubmit}) => (
          <form onSubmit={onSubmit}>
            <h1>Contact us</h1>

            {error}

            <Field name="firstName" validate={validate.firstName}>
              <Control label="First name:"/>
            </Field>

            <Field name="lastName" validate={validate.lastName}>
              <Control label="Last name:"/>
            </Field>

            <Field name="email" validate={validate.email}>
              <Control label="Email:"/>
            </Field>

            <Field name="message" validate={validate.message} defaultValue="I love your product so much!">
              <Control label="Message:" component="textarea"/>
            </Field>

            <button type="submit" disabled={submitting}>Send</button>

          </form>
        )}
      </Form>
    );
  }

}

export default SimpleExample;
