import React, { Component } from 'react';
import { Avatar } from 'antd';
import './style.less';

class PlayersIconList extends Component {
  render() {
    if (!this.props.players) return false;
    let avatarClassName = this.props.size === 'xl' ? 'avatar-xl' : '';
    return (
      <div className="PlayersIconList">
        {this.props.players.map((player, index) => (
          <Avatar
            src={player.photoUrl}
            className={avatarClassName}
            size="large"
            key={index}
          >
            {player.displayName && player.displayName.substr(0, 3)}
          </Avatar>
        ))}
      </div>
    );
  }
}

export default PlayersIconList;
