import React from 'react';
import {Form, Field} from '../../../../..';
import Control from '../../../shared/Control';
import validate from './validate';

class Page1 extends React.Component {

  constructor(...args) {
    super(...args);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log('Submitted #1:', values);
    this.props.onStep(values);
    this.props.onNext();
  }

  render() {
    return (
      <div>
        <h2>Page #1</h2>
        <Form name="page-1" onSubmit={this.handleSubmit.bind(this)}>

          <Field name="firstName" validate={validate.firstName}>
            <Control label="First name:" autoFocus/>
          </Field>

          <Field name="lastName" validate={validate.lastName}>
            <Control label="Last name:"/>
          </Field>

          <Field name="email" validate={validate.email}>
            <Control label="Email:"/>
          </Field>

          <button>Next &gt;</button>

        </Form>
      </div>
    );
  }

}

export default Page1;
