import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from 'views/Main';
import Room from 'views/Room';
import Session from 'views/Session';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/rooms/:roomId" component={Room} />
          <Route
            path="/templates/:templateId/sessions/:sessionId"
            component={Session}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
