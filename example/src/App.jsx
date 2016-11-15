import React from 'react';
import Simple from './examples/Simple';
import Wizard from './examples/Wizard';

const views = {
  simple: Simple,
  wizard: Wizard
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
    console.log(View, this.state.view);
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
