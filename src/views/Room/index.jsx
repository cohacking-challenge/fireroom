import React, { Component } from 'react';
import { Button } from 'antd';
import QuestionPage from 'components/QuestionPage';
import questionStatuses from 'enums/questionStatuses';
import { Row, Col } from 'antd';

import './style.css';

/**
 * Component to handle all the logic of a room
 * (waiting partcipants, display pages, ...)
 */
class Room extends Component {
  constructor(props) {
    super(props);
    // The following state in just for the example
    // TODO: find a way to link it with Firebase
    this.state = {
      curPageIndex: 0,
      curPageStatus: 'showTitle',
      responses: [
        {
          participantIndex: 0,
          answerIndex: 0,
        },
        {
          participantIndex: 1,
          answerIndex: 1,
        },
        {
          participantIndex: 2,
          answerIndex: 2,
        },
        {
          participantIndex: 3,
          answerIndex: 3,
        },
        {
          participantIndex: 4,
          answerIndex: 0,
        },
        {
          participantIndex: 5,
          answerIndex: 0,
        },
      ],
      pages: [
        {
          type: 'QUESTION',
          title: 'What is the best language?',
          answers: [
            {
              label: 'JavaScript',
              isCorrect: true,
            },
            {
              label: 'Python',
              isCorrect: false,
            },
            {
              label: 'PHP',
              isCorrect: false,
            },
            {
              label: 'Ruby',
              isCorrect: false,
            },
          ],
        },
        {
          type: 'QUESTION',
          title: 'Who is the best teacher?',
          answers: [
            {
              label: 'Eduardo',
              isCorrect: false,
            },
            {
              label: 'Maxence',
              isCorrect: true,
            },
            {
              label: 'Nizar',
              isCorrect: false,
            },
            {
              label: 'Yacine',
              isCorrect: true,
            },
          ],
        },
        {
          type: 'QUESTION',
          title: 'What is the best language?',
          answers: [
            {
              label: 'JavaScript',
              isCorrect: true,
            },
            {
              label: 'Python',
              isCorrect: false,
            },
            {
              label: 'PHP',
              isCorrect: false,
            },
            {
              label: 'Ruby',
              isCorrect: false,
            },
          ],
        },
      ],
    };
    this.goNextPageStatus = this.goNextPageStatus.bind(this);
  }

  /**
   * Allows you to go to the next (+1) or previous (-1) status
   * and eventually to the next page
   * @param {Number} diffIndex The diff: +1 for next, -1 for previous.
   */
  goNextPageStatus(diffIndex) {
    let curIndex = questionStatuses.findIndex(
      x => x === this.state.curPageStatus,
    );
    let newCurPageIndex = this.state.curPageIndex;
    let newIndex = curIndex + diffIndex;
    if (newIndex < 0) {
      newIndex = 0;
      newCurPageIndex = Math.max(0, newCurPageIndex - 1);
    }
    if (newIndex >= questionStatuses.length) {
      newIndex = 0;
      newCurPageIndex = newCurPageIndex + 1;
    }
    this.setState({
      curPageStatus: questionStatuses[newIndex],
      curPageIndex: newCurPageIndex,
    });
  }

  render() {
    return (
      <div className="Room">
        {/* <h2>{this.state.pages[this.state.curPageIndex].title}</h2> */}

        {this.state.curPageIndex < this.state.pages.length && (
          <div
            style={{
              backgroundColor: '#E76F51',
              margin: '0 10%',
              padding: '50px',
            }}
          >
            <Row gutter={24} style={{ flexWrap: 'wrap' }} align="top">
              <QuestionPage
                page={this.state.pages[this.state.curPageIndex]}
                pageStatus={this.state.curPageStatus}
                responses={this.state.responses}
              />
            </Row>
          </div>
        )}
        {this.state.curPageIndex >= this.state.pages.length && (
          <h3>It's over!</h3>
        )}

        <Button onClick={() => this.goNextPageStatus(-1)}>Previous</Button>
        <Button onClick={() => this.goNextPageStatus(1)}>Next</Button>
        <pre>curPageStatus: {this.state.curPageStatus}</pre>
        <pre>curPageIndex: {this.state.curPageIndex}</pre>
      </div>
    );
  }
}
export default Room;
