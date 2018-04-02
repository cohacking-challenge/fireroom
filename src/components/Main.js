import React, { Component } from 'react';
import logo from '../logo.svg';
import { Route, NavLink } from 'react-router-dom';
import Signup from './Signup';
import Chat from './Chat';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <header className="Main-header">
          <img
            src={logo}
            className="Main-logo"
            alt="logo"
            style={{ height: 60 }}
          />
          <h1 className="Main-title">Welcome to React</h1>
        </header>
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
            <li>
              <NavLink to="/rooms/42" activeStyle={{ fontWeight: 'bold' }}>
                Room 42
              </NavLink>
            </li>
            <li>
              <NavLink to="/chat" activeStyle={{ fontWeight: 'bold' }}>
                Chat
              </NavLink>
            </li>
          </ul>

          <hr />
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/chat" component={Chat} />
        </div>
      </div>
    );
  }
}

export default Main;
