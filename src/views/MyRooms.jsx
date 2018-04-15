import React, { Component } from 'react';
import MyRooms from 'components/MyRooms';
import UserContext from 'contexts/UserContext';

class MyRoomsView extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ user }) =>
          user ? <MyRooms user={user} /> : <div>No room to show yet</div>
        }
      </UserContext.Consumer>
    );
  }
}

export default MyRoomsView;
