import React, { Component } from 'react';
import Message from 'components/Message';
import MessageInput from 'components/MessageInput';
import FireContainer from 'components/FireContainer';
import db from 'backend/db';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Maxence',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }
  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }
  render() {
    return (
      <div className="Chat">
        <FireContainer dbRef={db.collection('messages').orderBy('date')}>
          {(messages, snapshot, dbRef) => {
            return (
              messages &&
              messages.map(message => {
                return (
                  <Message
                    currentUsername={this.state.username}
                    text={message.text}
                    username={message.username}
                    date={message.date}
                  />
                );
              })
            );
          }}
        </FireContainer>

        <MessageInput
          username={this.state.username}
          onUsernameChange={this.handleUsernameChange}
        />
      </div>
    );
  }
}

export default Chat;
