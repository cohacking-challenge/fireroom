import React, { Component } from 'react';
import { Form } from 'antd';
import firebase from 'firebase';
import firebaseui from 'firebaseui';

class Signup extends Component {
  login() {
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          this.props.changeUser(authResult.user);
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: () => {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: window.location.origin,
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          requireDisplayName: true,
        },
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
    };
    if (firebaseui.auth.AuthUI.getInstance() === null) {
      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
    } else {
      this.props.navigateToHome();
      // <Redirect to="/" />;
    }
  }

  componentDidMount() {
    this.login();
  }

  render() {
    return (
      <div style={{ marginTop: '25vh' }}>
        <div id="firebaseui-auth-container" />
        <div id="loader">Loading...</div>
      </div>
    );
  }
}
export default Form.create()(Signup);
