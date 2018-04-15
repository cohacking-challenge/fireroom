import React, { Component } from 'react';
import Signup from 'components/Signup';
import UserContext from 'contexts/UserContext';

class SignupView extends Component {
  constructor(props) {
    super(props);
    this.navigateToHome = this.navigateToHome.bind(this);
  }
  navigateToHome() {
    this.props.history.push('/');
  }
  render() {
    return (
      <UserContext.Consumer>
        {({ user, changeUser }) => (
          <Signup
            user={user}
            changeUser={changeUser}
            navigateToHome={this.navigateToHome}
          />
        )}
      </UserContext.Consumer>
    );
  }
}
export default SignupView;
