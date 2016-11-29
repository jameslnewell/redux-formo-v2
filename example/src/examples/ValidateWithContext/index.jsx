import React from 'react';
import {Form, Field} from '../../../..';
import Control from '../../shared/Control';
import validate from './validate';

class ValidateWithContext extends React.Component {

  constructor(...args) {
    super(...args);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log('Submitting', values);
  }

  render() {
    return (
      <Form name="validate-with-context" onSubmit={this.handleSubmit}>
        {({error, submitting, submitted, onSubmit}) => (
          <form onSubmit={onSubmit}>
            <h1>Validate with context</h1>

            {error}

            <Field name="password" validate={validate.password}>
              <Control label="Password:"/>
            </Field>

            <Field name="passwordConfirmation" validate={validate.passwordConfirmation}>
              <Control label="Confirm password:"/>
            </Field>

            <button type="submit" disabled={submitting}>Send</button>

          </form>
        )}
      </Form>
    );
  }

}

export default ValidateWithContext;
