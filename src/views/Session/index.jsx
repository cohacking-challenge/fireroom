import React, { Component } from 'react';
// import { Button } from 'antd';
import FireContainer from 'components/FireContainer';
import QuestionPage from 'components/QuestionPage';
// import questionStatuses from 'enums/questionStatuses';
import db from 'backend/db';

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

  render() {
    return (
      <div className="Session">
        <FireContainer dbRef={this.templateRef}>
          {template =>
            template && (
              <FireContainer dbRef={this.sessionRef}>
                {session => {
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
                            question && (
                              <QuestionPage
                                question={question}
                                questionStatus={
                                  session.curPageStatus.questionStatus
                                }
                                responses={session.responses[question.__id]}
                              />
                            )
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
