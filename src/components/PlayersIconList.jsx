import React, { Component } from 'react';
import { Avatar } from 'antd';

class Player extends Component {
  render() {
    if (!this.props.players) return false;
    return (
      <div>
        {this.props.players.map((player, index) => (
          <Avatar
            src={player.photoUrl}
            style={{
              backgroundColor: '#931D00',
              color: 'white',
              verticalAlign: 'middle',
            }}
            size="large"
            key={index}
          >
            {player.displayName.substr(0, 3)}
          </Avatar>
        ))}
      </div>
    );
  }
}

export default Player;
