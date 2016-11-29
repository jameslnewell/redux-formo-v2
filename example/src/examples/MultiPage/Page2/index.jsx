import React from 'react';
import {Form, Field} from '../../../../..';
import Control from '../../../shared/Control';
import validate from './validate';

class Page2 extends React.Component {

  constructor(...args) {
    super(...args);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePrev() {
    this.props.onPrev();
  }

  handleSubmit(values) {
    console.log('Submitted #2:', values);
    this.props.onStep(values);
    this.props.onComplete();
  }

  render() {
    return (
      <div>
        <h2>Page #2</h2>
        <Form name="page-2" onSubmit={this.handleSubmit.bind(this)}>

          <Field name="skills" validate={validate.message}>
            <Control label="Skills:" component="textarea" autoFocus/>
          </Field>

          <button type="button" onClick={this.handlePrev}>&lt; Previous</button>
          <button>Submit</button>

        </Form>
      </div>
    );
  }

}

export default Page2;
