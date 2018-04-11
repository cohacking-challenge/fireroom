import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Signup from 'views/Signup';
import Chat from 'views/Chat';
import TemplateCreationContainer from 'components/TemplateCreationContainer';
import SessionsList from 'components/SessionsList';
import logo from '../logo.svg';
import firebase from 'firebase';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user });
      }
    });
  }

  logOut(e) {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ user: null });
      })
      .catch(error => {
        throw new Error('logOut error', error);
      });
  }
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
            {this.state.user && (
              <li>
                <a onClick={this.logOut}>Sign out</a>
              </li>
            )}
            {!this.state.user && (
              <li>
                <NavLink to="/signup" activeStyle={{ fontWeight: 'bold' }}>
                  Signup / Login
                </NavLink>
              </li>
            )}

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
          <h2>Running sessions</h2>
          <SessionsList />
          <hr />

          {this.state.user && <div>Hello {this.state.user.displayName}</div>}

          <p>To test this awesome application, you need to:</p>

          <ul>
            <li>Login (by clicking on "Signup/login")</li>
            <li>Select a running session</li>
            <li>Wait eventual other participants</li>
            <li>Click on the button "Fire the room!"</li>
            <li>Click on the buttons "Next"</li>
            <li>Select some answers</li>
          </ul>

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
