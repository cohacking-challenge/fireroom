import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Signup from 'views/Signup';
import MyTemplates from 'views/MyTemplates';
import NewTemplate from 'views/NewTemplate';
import EditTemplate from 'views/EditTemplate';
import SessionsList from 'components/SessionsList';
import UserContext from 'contexts/UserContext';

class Main extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ logOut, user }) => (
          <div className="Main">
            <header className="Main-header">
              <img
                src="/img/logo-white.png"
                className="Main-logo"
                alt="logo"
                style={{ height: 25, margin: 20 }}
              />
              <NavLink className="ant-btn" to="/" exact={true}>
                Home
              </NavLink>{' '}
              {user && (
                <NavLink className="ant-btn" to="/my-templates">
                  My rooms
                </NavLink>
              )}{' '}
              {user && (
                <NavLink className="ant-btn" to="/sessions">
                  Sessions List
                </NavLink>
              )}{' '}
              {user && (
                <a className="ant-btn" onClick={logOut}>
                  Sign out
                </a>
              )}
              {!user && (
                <NavLink className="ant-btn" to="/signup">
                  Signup / Login
                </NavLink>
              )}{' '}
            </header>
            <Route exact path="/signup" component={Signup} />
            <Route path="/my-templates" component={MyTemplates} />
            <Route path="/sessions" component={SessionsList} />
            <Route path="/new-template" component={NewTemplate} />
            <Route path="/templates/:templateId" component={EditTemplate} />
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Main;
