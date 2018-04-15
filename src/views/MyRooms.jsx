import React, { Component } from 'react';
import MyRooms from 'components/MyRooms';
import UserContext from 'contexts/UserContext';

class MyRoomsView extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ user }) => <MyRooms user={user} />}
      </UserContext.Consumer>
    );
  }
}

export default MyRoomsView;
