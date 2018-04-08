import React, { Component } from 'react';
import { Avatar } from 'antd';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatars: ['Tom', 'Lucy', 'Maxime', 'Toto'],
    };
  }

  render() {
    return (
      <div style={{ marginTop: '40%' }}>
        <h3>List of participants : </h3>
        {this.state.avatars.map((avatar, index) => (
          <Avatar
            style={{
              backgroundColor: '#931D00',
              color: 'white',
              verticalAlign: 'middle',
            }}
            size="large"
            key={index}
          >
            {avatar}
          </Avatar>
        ))}
      </div>
    );
  }
}

export default Player;
