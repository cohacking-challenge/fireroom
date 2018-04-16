import React, { Component } from 'react';
import MyTemplates from 'components/MyTemplates';
import UserContext from 'contexts/UserContext';

class MyTemplatesView extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ user }) =>
          user ? <MyTemplates user={user} /> : <div>No room to show yet</div>
        }
      </UserContext.Consumer>
    );
  }
}

export default MyTemplatesView;
