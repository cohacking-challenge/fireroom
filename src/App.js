import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import Room from './components/Room';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/rooms/:roomId" component={Room} />
          <Route path="/" component={Main} />
        </Switch>
      </div>
    );
  }
}

export default App;
