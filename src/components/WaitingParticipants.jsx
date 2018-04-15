import React, { Component } from 'react';
import PlayersIconList from './PlayersIconList';
import { Button } from 'antd';

class WaitingParticipants extends Component {
  handleClick() {
    this.props.sessionRef.set(
      {
        curStatus: 'live',
      },
      { merge: true },
    );
  }
  render() {
    return (
      <div>
        <h2>WaitingParticipants</h2>
        <PlayersIconList players={this.props.participants} />
        {this.props.user &&
          this.props.user.isOwner && (
            <Button onClick={() => this.handleClick()}>Fire the room!</Button>
          )}
      </div>
    );
  }
}
export default WaitingParticipants;
