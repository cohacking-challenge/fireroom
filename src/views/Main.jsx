import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Signup from 'views/Signup';
import Chat from 'views/Chat';
import TemplateCreationContainer from 'components/TemplateCreationContainer';
import logo from '../logo.svg';

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
          <h1 className="Main-title">Welcome to Fireroom</h1>
        </header>
        <div>
          <ul>
            <li>
              <NavLink to="/signup" activeStyle={{ fontWeight: 'bold' }}>
                Signup (not connected to Firebase)
              </NavLink>
            </li>
            <li>
              <NavLink to="/chat" activeStyle={{ fontWeight: 'bold' }}>
                Chat test
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/templates/123"
                activeStyle={{ fontWeight: 'bold' }}
              >
                Edit Template 123
              </NavLink>
            </li>
            <li>
              <NavLink to="/rooms/42" activeStyle={{ fontWeight: 'bold' }}>
                Room 42 (not connected to Firebase)
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/templates/Gy3XDxWihs18sDXTU0Ej/sessions/zm9BNcGVenKWZ1gHUBhd"
                activeStyle={{ fontWeight: 'bold' }}
              >
                Test Session
              </NavLink>
            </li>
          </ul>

          <hr />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/chat" component={Chat} />
          <Route
            exact
            path="/admin/templates/:templateId"
            component={TemplateCreationContainer}
          />
        </div>
      </div>
    );
  }
}

export default Main;
