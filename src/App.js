import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Content from './Content';
import TemplateCreation from './components/TemplateCreation';
import TemplateCreationContainer from './components/TemplateCreationContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Jane Doe',
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          {/* <Content /> */}
          <TemplateCreationContainer />
        </div>
      </div>
    );
  }
}

export default App;
