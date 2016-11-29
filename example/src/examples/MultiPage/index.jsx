import React from 'react';
import Page1 from './Page1';
import Page2 from './Page2';

const pages = [Page1, Page2];

class WizardExample extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {page: 0};
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleStep = this.handleStep.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handlePrev() {
    this.setState({page: Math.max(0, --this.state.page)});
  }

  handleNext() {
    this.setState({page: Math.min(1, ++this.state.page)});
  }

  handleStep(values) {
    this.setState({
      values: {...this.state.values, ...values}
    });
  }

  handleComplete() {
    this.setState({
      completed: true
    });
  }

  render() {
    const Page = pages[this.state.page];
    return (
      <div>
        <h1>Multi page</h1>
        {!this.state.completed
          ? <Page onPrev={this.handlePrev} onNext={this.handleNext} onStep={this.handleStep} onComplete={this.handleComplete}/>
          : (
            <div>
              <h2>Your profile has been saved</h2>
              <pre>{JSON.stringify(this.state.values, null, 2)}</pre>
            </div>
          )
        }

      </div>
    );
  }

}

export default WizardExample;
