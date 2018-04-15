import React, { Component, Fragment } from 'react';
import { Button, Layout } from 'antd';
import FireContainer from 'components/FireContainer';
import QuestionPage from 'components/QuestionPage';
import WaitingParticipants from 'components/WaitingParticipants';
import SessionNavigation from 'components/SessionNavigation';
import UserContext from 'contexts/UserContext';
// import questionStatuses from 'enums/questionStatuses';
import db from 'backend/db';
import questionStatuses from 'enums/questionStatuses';
import firebase from 'firebase';

import './style.css';

const { Footer, Content } = Layout;

/**
 * Component to handle all the logic of a Session
 * (waiting partcipants, display pages, ...)
 */
class Session extends Component {
  constructor(props) {
    super(props);
    this.goNextStep = this.goNextStep.bind(this);
    this.resetStep = this.resetStep.bind(this);
  }

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
        curStatus: 'waitingParticipants',
        curPageStatus: {
          questionStatus: questionStatuses[0],
        },
        curPageIndex: 0,
      },
      { merge: true },
    );
  }

  addNewUserInSessionIfNew(template, session, user) {
    const userIsOwner = Boolean(user) && template.ownerUid === user.uid;
    let newParticipants = [];
    if (session.participants) {
      newParticipants = session.participants;
    }
    if (!userIsOwner && !newParticipants.map(p => p.uid).includes(user.uid)) {
      newParticipants.push({
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        emailVerified: user.emailVerified,
        uid: user.uid,
      });
      this.sessionRef.set({ participants: newParticipants }, { merge: true });
    }
  }

  render() {
    return (
      <Layout className="Session">
        <FireContainer dbRef={this.templateRef}>
          {template => (
            <FireContainer dbRef={this.sessionRef}>
              {session => (
                <UserContext.Consumer>
                  {({ user }) => {
                    const userIsOwner = user.uid === template.ownerUid;
                    this.addNewUserInSessionIfNew(template, session, user);
                    if (session.curStatus === 'waitingParticipants') {
                      return (
                        <WaitingParticipants
                          userIsOwner={userIsOwner}
                          sessionRef={this.sessionRef}
                          participants={session.participants}
                        />
                      );
                    }
                    if (session.curPageIndex >= template.pages.length) {
                      return "It's over"; // TODO: Put a Component
                    }

                    const page = template.pages[session.curPageIndex];
                    if (page.type !== 'QUESTION') {
                      throw new Error('This is not a question');
                    }
                    const questionRef = page.questionRef;
                    return (
                      <FireContainer dbRef={questionRef}>
                        {question => {
                          return (
                            <Fragment>
                              <Content>
                                <QuestionPage
                                  user={user}
                                  userIsOwner={userIsOwner}
                                  sessionRef={this.sessionRef}
                                  question={question}
                                  questionStatus={
                                    session.curPageStatus.questionStatus
                                  }
                                  responses={session.responses}
                                  responsesOfQuestion={
                                    session.responses[question.__id]
                                  }
                                  participants={session.participants}
                                />
                              </Content>
                              {userIsOwner && (
                                <SessionNavigation
                                  pageType={page.type}
                                  session={session}
                                  goNextStep={this.goNextStep}
                                  resetStep={this.resetStep}
                                />
                              )}
                            </Fragment>
                          );
                        }}
                      </FireContainer>
                    );
                  }}
                </UserContext.Consumer>
              )}
            </FireContainer>
          )}
        </FireContainer>
      </Layout>
    );
  }
}
export default Session;
