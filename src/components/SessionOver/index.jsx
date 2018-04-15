import React, { Component } from 'react';
import PlayersIconList from 'components/PlayersIconList';
import { Button } from 'antd';

import './style.less';

class SessionOver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGif: true,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showGif: false,
      });
    }, 10000);
  }
  render() {
    return (
      <div className="SessionOver">
        {this.state.showGif && (
          <img src="https://i.imgur.com/LERj2gF.gif" alt="" />
        )}
        {!this.state.showGif && <h2>It's over!</h2>}
      </div>
    );
  }
}
export default SessionOver;
