import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from 'react-router-dom';
import Main from './components/Main';
import Room from './components/Room';
import Chat from './components/Chat';
import { DatePicker } from 'antd';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

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
