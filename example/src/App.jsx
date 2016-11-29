import React from 'react';
import Simple from './examples/Simple';
import MultiPage from './examples/MultiPage';
import ConditionalHiddenField from './examples/ConditionalHiddenField';
import ValidateWithContext from './examples/ValidateWithContext';

const views = {
  simple: Simple,
  'multi-page': MultiPage,
  'conditional-hidden-field': ConditionalHiddenField,
  'validate-with-context': ValidateWithContext
};

class App extends React.Component {

  constructor() {
    super();
    this.state = {view: Object.keys(views)[0]};
  }

  handleViewChange(event) {
    this.setState({view: event.target.value})
  }

  render() {
    const View = views[this.state.view];
    return (
      <div>
        <select onChange={this.handleViewChange.bind(this)} autoFocus>
          {Object.keys(views).map(view => <option key={view} value={view}>{view}</option>)}
        </select>
        <View/>
      </div>
    );
  }

}

export default App;
