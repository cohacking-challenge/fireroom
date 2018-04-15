import React, { Component } from "react";
import PlayersIconList from "./PlayersIconList";
import { Button } from "antd";

class WaitingParticipants extends Component {
  handleClick() {
    this.props.sessionRef.set(
      {
        curStatus: "live"
      },
      { merge: true }
    );
  }
  render() {
    return (
      <div>
        <h2>WaitingParticipants</h2>
        <p>Pin: {this.props.pinValue}</p>
        <PlayersIconList players={this.props.participants} />
        <Button onClick={() => this.handleClick()}>Fire the room!</Button>
      </div>
    );
  }
}
export default WaitingParticipants;
