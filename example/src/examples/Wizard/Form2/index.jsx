import React from 'react';
import {Form, Field} from '../../../../..';
import Control from '../../../shared/Control';
import validate from './validate';

class Form2 extends React.Component {

  constructor(...args) {
    super(...args);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log('Submitted #2:', values);
    this.props.onPrev();
  }

  render() {
    return (
      <div>
        <h2>Form #2</h2>
        <Form name="form-2" validate={validate} onSubmit={this.handleSubmit.bind(this)}>

          <Field name="Skills">
            <Control label="Skills:" component="textarea" autoFocus/>
          </Field>

          <button>&lt; Previous</button>

        </Form>
      </div>
    );
  }

}

export default Form2;
