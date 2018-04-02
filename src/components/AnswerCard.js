import React, { Component } from 'react';
import { Progress } from 'antd';

let styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 100,
    width: 500,
    margin: 'auto',
    marginBottom: 10,
  },
  mainDefault: {
    backgroundColor: 'white',
    color: 'red',
  },
  mainWrong: {
    backgroundColor: 'none',
    color: 'white',
  },
  progressContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
};

/**
 * Component to display an answer card
 * - `props.children` {Mixed}: The content of the card
 * - `props.isTransparent` {Boolean} (false): Transparent card if true
 * - `props.nbVoters` {Number} (null): Nb of voters for this card
 * - `props.totalVoters` {Number} (null): Total voters for all cards. Display a progress bar if defined
 */
class AnswerCard extends Component {
  getPercent(fds) {
    return this.props.nbVoters / this.props.totalVoters * 100;
  }

  render() {
    return (
      <div
        className="AnswerCard"
        style={
          this.props.isTransparent
            ? { ...styles.main, ...styles.mainWrong }
            : { ...styles.main, ...styles.mainDefault }
        }
      >
        {this.props.children}
        {this.props.totalVoters && (
          <div style={styles.progressContainer}>
            <Progress
              style={styles.progress}
              percent={this.getPercent()}
              status="exception"
              showInfo={false}
            />
          </div>
        )}
      </div>
    );
  }
}
export default AnswerCard;