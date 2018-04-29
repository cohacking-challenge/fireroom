import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Layout } from 'antd';

import './style.less';

const { Content, Header, Footer } = Layout;

class SessionOver extends Component {
  getLeaderBoard() {
    let res = this.props.participants.slice();
    res.sort((a, b) => b.score - a.score);
    return res.slice(0, 3);
  }

  getScore(user, participants) {
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].uid === user.uid) {
        return participants[i].score || 0;
      }
    }
    return 0;
  }

  render() {
    return (
      <div className="SessionOver">
        {!this.props.userIsOwner && (
          <Header>
            Score: {this.getScore(this.props.user, this.props.participants)}
          </Header>
        )}

        <Content className="content">
          <h2>Leader Board</h2>
          <div className="leaderItems">
            {this.getLeaderBoard().map(participant => (
              <div key={participant.uid} className="leaderItem">
                <Avatar src={participant.photoUrl} size="large">
                  {participant.displayName &&
                    participant.displayName.substr(0, 3)}
                </Avatar>{' '}
                {participant.score} - {participant.displayName}
              </div>
            ))}
          </div>
        </Content>
        <Footer>
          <h4>
            <Link to="/">Go home!</Link>
          </h4>
        </Footer>
      </div>
    );
  }
}
export default SessionOver;
