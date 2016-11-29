import React from 'react';
import {Form, Field} from '../../../..';
import Control from '../../shared/Control';
import validate from './validate';

class ConditionalHiddenField extends React.Component {

  constructor(...args) {
    super(...args);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log('Submitting', values);
  }

  handleChangeAnswer() {

    //TODO: need to know whether `existingCustomerNumber` has changed since last call to `validate()` so we know whether to call `validate()` again
    // (to avoid the field being validated on page-load when the user hasn't visitied it)

    if (this.existingCustomerNumber.isDirty()) {

    }

    this.existingCustomerNumber.validate();
  }

  render() {
    return (
      <Form name="conditional-hidden-field" onSubmit={this.handleSubmit}>
        {({error, submitting, submitted, onSubmit}) => (
          <form onSubmit={onSubmit}>
            <h1>Conditional hidden field</h1>

            {error}

            <Field name="existingCustomer" validate={validate.existingCustomer} onValid={this.handleChangeAnswer}>
              <Control label="Are you an existing customer?" component={'select'} options={{y: 'Yes', n: 'No'}}/>
            </Field>

            <Field name="existingCustomerNumber" validate={validate.existingCustomerNumber}>
              <Control label="Your customer number:"/>
            </Field>

            <button type="submit" disabled={submitting}>Send</button>

          </form>
        )}
      </Form>
    );
  }

}

export default ConditionalHiddenField;
