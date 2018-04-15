import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import firebase from 'firebase';

import Main from 'views/Main';
import Room from 'views/Room';
import Session from 'views/Session';
import Signup from 'views/Signup';
import NewTemplate from 'views/NewTemplate';
import EditTemplate from 'views/EditTemplate';
import MyRooms from 'views/MyRooms';
import UserContext from 'contexts/UserContext';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.changeUser = this.changeUser.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user });
      }
    });
  }

  changeUser(user) {
    this.setState({ user });
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
      <UserContext.Provider
        value={{
          user: this.state.user,
          logOut: this.logOut,
          changeUser: this.changeUser,
        }}
      >
        <div className="App">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/signup" component={Signup} />
            <Route path="/rooms/:roomId" component={Room} />
            <Route
              path="/templates/:templateId/sessions/:sessionId"
              component={Session}
            />
            <Route path="/new-template" component={NewTemplate} />
            <Route path="/my-rooms" component={MyRooms} />
            <Route path="/templates/:templateId" component={EditTemplate} />
          </Switch>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
