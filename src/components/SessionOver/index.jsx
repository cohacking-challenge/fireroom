import React, { Component } from 'react';

import './style.less';

class SessionOver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGif: true,
    };
  }
  handleOnLoad() {
    this.setState({
      showGif: false,
    });
  }
  render() {
    return (
      <div className="SessionOver">
        {this.state.showGif && (
          <img
            src="https://i.imgur.com/LERj2gF.gif"
            onLoad={this.handleOnLoad.bind(this)}
            alt=""
          />
        )}
        {!this.state.showGif && <h2>It's over!</h2>}
      </div>
    );
  }
}
export default SessionOver;
