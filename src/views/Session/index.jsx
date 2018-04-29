import React, { Component, Fragment } from 'react';
import { Layout } from 'antd';
import FireContainer from 'components/FireContainer';
import QuestionPage from 'components/QuestionPage';
import SessionWaitingParticipants from 'components/SessionWaitingParticipants';
import SessionOver from 'components/SessionOver';
import SessionNavigation from 'components/SessionNavigation';
import UserContext from 'contexts/UserContext';
// import questionStatuses from 'enums/questionStatuses';
import db from 'backend/db';
import questionStatuses from 'enums/questionStatuses';

import './style.css';

const { Content, Header } = Layout;

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

  goNextStep(template, session, pageType) {
    if (pageType !== 'QUESTION') {
      throw new Error('This is not a question');
    }
    let curStatus = session.curStatus;
    let curQuestionStatusesIndex = questionStatuses.findIndex(
      x => session.curPageStatus && x === session.curPageStatus.questionStatus,
    );
    let newCurPageIndex = session.curPageIndex;
    let newCurQuestionStatusesIndex = curQuestionStatusesIndex + 1;
    if (newCurQuestionStatusesIndex >= questionStatuses.length) {
      newCurQuestionStatusesIndex = 0;
      newCurPageIndex++;
    }
    if (newCurPageIndex >= template.pages.length) {
      curStatus = 'over';
    }

    this.sessionRef.set(
      {
        curStatus,
        curPageStatus: {
          isScoreCalculated: false,
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

  getScore(user, participants) {
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].uid === user.uid) {
        return participants[i].score || 0;
      }
    }
    return 0;
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
                        <SessionWaitingParticipants
                          userIsOwner={userIsOwner}
                          sessionRef={this.sessionRef}
                          participants={session.participants}
                        />
                      );
                    }
                    if (
                      session.curStatus === 'over' ||
                      session.curPageIndex >= template.pages.length
                    ) {
                      return (
                        <SessionOver
                          user={user}
                          userIsOwner={userIsOwner}
                          participants={session.participants}
                        />
                      );
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
                              {!userIsOwner && (
                                <Header>
                                  Score:{' '}
                                  {this.getScore(user, session.participants)}
                                </Header>
                              )}

                              <Content className="flex">
                                <QuestionPage
                                  user={user}
                                  userIsOwner={userIsOwner}
                                  sessionRef={this.sessionRef}
                                  question={question}
                                  questionStatus={
                                    session.curPageStatus.questionStatus
                                  }
                                  isScoreCalculated={
                                    session.curPageStatus.isScoreCalculated
                                  }
                                  responses={session.responses}
                                  responsesOfQuestion={
                                    session.responses &&
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
                                  template={template}
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
