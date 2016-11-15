import React from 'react';
import {Form, Field} from '../../../..';
import Control from '../../shared/Control';
import validate from './validate';

class SimpleExample extends React.Component {

  handleSubmit(values) {
    alert(`submitted with: ${values}`)
  }

  render() {
    return (
      <Form name="contact" validate={validate} onSubmit={this.handleSubmit.bind(this)}>

        <h1>Contact us</h1>

        <Field name="firstName">
          <Control label="First name:" autoFocus/>
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
