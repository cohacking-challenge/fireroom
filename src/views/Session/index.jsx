import React, { Component } from 'react';
import { Button } from 'antd';
import FireContainer from 'components/FireContainer';
import QuestionPage from 'components/QuestionPage';
// import questionStatuses from 'enums/questionStatuses';
import db from 'backend/db';
import questionStatuses from 'enums/questionStatuses';

import './style.css';

/**
 * Component to handle all the logic of a Session
 * (waiting partcipants, display pages, ...)
 */
class Session extends Component {
  get templateRef() {
    return db.collection('templates').doc(this.props.match.params.templateId);
  }

  get sessionRef() {
    return this.templateRef
      .collection('sessions')
      .doc(this.props.match.params.sessionId);
  }

  goNextStep(pageType, session) {
    if (pageType !== 'QUESTION') {
      throw new Error('This is not a question');
    }
    let curQuestionStatusesIndex = questionStatuses.findIndex(
      x => session.curPageStatus && x === session.curPageStatus.questionStatus,
    );
    let newCurPageIndex = session.curPageIndex;
    let newCurQuestionStatusesIndex = curQuestionStatusesIndex + 1;
    if (newCurQuestionStatusesIndex >= questionStatuses.length) {
      newCurQuestionStatusesIndex = 0;
      newCurPageIndex++;
    }

    this.sessionRef.set(
      {
        curPageStatus: {
          questionStatus: questionStatuses[newCurQuestionStatusesIndex],
        },
        curPageIndex: newCurPageIndex,
      },
      { merge: true },
    );
  }

  resetStep() {
    this.sessionRef.set(
      {
        curPageStatus: {
          questionStatus: questionStatuses[0],
        },
        curPageIndex: 0,
      },
      { merge: true },
    );
  }

  render() {
    return (
      <div className="Session">
        <FireContainer dbRef={this.templateRef}>
          {template =>
            template && (
              <FireContainer dbRef={this.sessionRef}>
                {session => {
                  if (session.curPageIndex >= template.pages.length) {
                    return "It's over"; // TODO: Put a Component
                  }

                  const page = template.pages[session.curPageIndex];
                  if (page.type !== 'QUESTION') {
                    throw new Error('This is not a question');
                  }
                  const questionRef = page.questionRef;
                  return (
                    session && (
                      <FireContainer dbRef={questionRef}>
                        {question => {
                          return (
                            <div>
                              <QuestionPage
                                question={question}
                                questionStatus={
                                  session.curPageStatus.questionStatus
                                }
                                responses={session.responses[question.__id]}
                              />
                              <div>
                                <Button onClick={e => this.resetStep()}>
                                  Reset
                                </Button>
                                <Button
                                  onClick={e =>
                                    this.goNextStep(page.type, session)
                                  }
                                >
                                  Next
                                </Button>
                              </div>
                            </div>
                          );
                        }}
                      </FireContainer>
                    )
                  );
                }}
              </FireContainer>
            )
          }
        </FireContainer>
      </div>
    );
  }
}
export default Session;
