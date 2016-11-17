import React from 'react';
import Form1 from './Form1';
import Form2 from './Form2';

const pages = [Form1, Form2];

class WizardExample extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {page: 0};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePrev() {
    this.setState({page: Math.max(0, --this.state.page)});
  }

  handleNext() {
    this.setState({page: Math.min(1, ++this.state.page)});
  }

  handleSubmit(values) {
    console.log('Submitted:', values);
  }

  render() {
    const WizardPage = pages[this.state.page];
    return (
      <div>
        <h1>Wizard</h1>
        <WizardPage onPrev={this.handlePrev.bind(this)} onNext={this.handleNext.bind(this)}/>
      </div>
    );
  }

}

export default WizardExample;
