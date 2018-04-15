import React, { Component } from 'react';
import { Progress } from 'antd';

let styles = {
  global: {
    main: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: 100,
      // width: 500,
      margin: '10px',
      marginBottom: 10,
      fontSize: '24px',
      borderRadius: '10px',
    },
    transparent: {
      backgroundColor: 'none',
      color: 'white',
    },
    selected: {
      backgroundColor: '#E9C46A',
    },
    default: {
      backgroundColor: '#F4A261',
    },
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
 * - `props.isSelected` {Boolean} (false): Change slightly the design to look selected
 * - `props.nbVoters` {Number} (null): Nb of voters for this card
 * - `props.totalVoters` {Number} (null): Total voters for all cards. Display a progress bar if defined
 */
class AnswerCard extends Component {
  getPercent(fds) {
    return this.props.nbVoters / this.props.totalVoters * 100;
  }

  render() {
    let globalStyle = { ...styles.global.main };
    if (this.props.isTransparent) {
      globalStyle = {
        ...globalStyle,
        ...styles.global.transparent,
      };
    } else if (this.props.isSelected) {
      globalStyle = {
        ...globalStyle,
        ...styles.global.selected,
      };
    } else {
      globalStyle = {
        ...globalStyle,
        ...styles.global.default,
      };
    }
    return (
      <div
        className="AnswerCard"
        onClick={this.props.onClick}
        style={globalStyle}
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
