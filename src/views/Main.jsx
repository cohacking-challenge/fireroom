import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Signup from 'views/Signup';
import Chat from 'views/Chat';
import TemplateCreationContainer from 'components/TemplateCreationContainer';
import SessionsList from 'components/SessionsList';
import logo from '../logo.svg';
import firebase from 'firebase';
import createTemplateWithSession from 'scripts/createTemplateWithSession';
import { Form, Input, Button } from 'antd';
import { Redirect } from 'react-router';
import { Menu } from 'antd';
import db from '../backend/db';

import './style.css';
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      value: '',
      validPin: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
    // createTemplateWithSession(); // TODO: remove to avoid to many template creation
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    db
      .collection('pins')
      .where('value', '==', this.state.value)
      .get()
      .then(querySnapshot => {
        //console.log("PIN", querySnapshot.empty);
        querySnapshot.forEach(documentSnapshot => {
          console.log('PIN', documentSnapshot.data());
          this.setState({ validPin: true });
          this.props.history.push(documentSnapshot.data().ref.path);
        });
      })
      .catch(error => {
        console.log(error);
      });
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
    const { getFieldDecorator } = this.props.form;
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Menu mode="horizontal">
              {this.state.user && (
                <div>Hello {this.state.user.displayName}</div>
              )}

              {this.state.user && (
                <Menu.Item>
                  <a onClick={this.logOut}>Sign out</a>
                </Menu.Item>
              )}
              {!this.state.user && (
                <Menu.Item>
                  <NavLink to="/signup" activeStyle={{ fontWeight: 'bold' }}>
                    Signup / Login
                  </NavLink>
                </Menu.Item>
              )}
              <Menu.Item>
                <NavLink to="/chat" activeStyle={{ fontWeight: 'bold' }}>
                  Chat test
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to="/rooms/42" activeStyle={{ fontWeight: 'bold' }}>
                  Room 42 (not connected to Firebase)
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink
                  to="/templates/Gy3XDxWihs18sDXTU0Ej/sessions/zm9BNcGVenKWZ1gHUBhd"
                  activeStyle={{ fontWeight: 'bold' }}
                >
                  Test Session
                </NavLink>
              </Menu.Item>
            </Menu>
          </div>
          {this.state.user && (
            <div>
              <h2>Running sessions</h2>
              <SessionsList />

              <hr />
            </div>
          )}
          <p>To test this awesome application, you need to:</p>
          <ul>
            {!this.state.user && <li>Login (by clicking on "Signup/login")</li>}
            {this.state.user && (
              <div>
                <li>Select a running session</li>
                <li>Wait eventual other participants</li>
                <li>Click on the button "Fire the room!"</li>
                <li>Click on the buttons "Next"</li>
                <li>Select some answers</li>
              </div>
            )}
          </ul>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/chat" component={Chat} />
          <Route
            exact
            path="/admin/templates/:templateId"
            component={TemplateCreationContainer}
          />{' '}
          {this.state.user && (
            <div>
              {!this.state.validPin && <div> Enter a valid PIN </div>}
              <form onSubmit={this.handleSubmit}>
                <label>
                  Pin:
                  <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Form.create()(Main);
