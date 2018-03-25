import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div
        className={
          this.props.currentUsername === this.props.username
            ? 'Message blue'
            : 'Message'
        }
      >
        <p>{this.props.text}</p>
        <small>
          {this.props.username} - {this.props.date.toDateString()}
        </small>
      </div>
    );
  }
}

export default Message;
