import React, { Component } from 'react';
import db from 'backend/db';

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <div className="message-input">
        <form onSubmit={this.handleSubmit}>
          <textarea
            value={this.state.text}
            placeholder="your message"
            rows="5"
            name="text"
            onChange={this.handleChange}
          />
          <br />
          <input
            onChange={this.props.onUsernameChange}
            value={this.props.username}
            placeholder="your name"
            name="username"
            type="text"
          />
          <br />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    db.collection('messages').add({
      text: this.state.text,
      username: this.props.username,
      date: new Date(),
    });
    this.setState({
      text: '',
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
}

export default MessageInput;
