import React, { Component } from 'react';
import PlayersIconList from 'components/PlayersIconList';
import { Button } from 'antd';

import './style.less';

class SessionWaitingParticipants extends Component {
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
      <div className="SessionWaitingParticipants">
        <h2>Waiting Participants</h2>
        <PlayersIconList players={this.props.participants} />
        {this.props.userIsOwner && (
          <Button onClick={() => this.handleClick()}>Fire the room!</Button>
        )}
      </div>
    );
  }
}
export default SessionWaitingParticipants;
