import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import Signup from './components/Signup';
import { DatePicker } from 'antd';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

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
        <Router>
          <div>
            <ul>
              <li>
                <NavLink exact to="/" activeStyle={{ fontWeight: 'bold' }}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" activeStyle={{ fontWeight: 'bold' }}>
                  Signup
                </NavLink>
              </li>
            </ul>

            <hr />
            <DatePicker />
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
