import React, { Component } from "react";
import { Button } from "antd";
import FireContainer from "components/FireContainer";
import QuestionPage from "components/QuestionPage";
import WaitingParticipants from "components/WaitingParticipants";
// import questionStatuses from 'enums/questionStatuses';
import db from "backend/db";
import questionStatuses from "enums/questionStatuses";
import firebase from "firebase";

import "./style.css";

/**
 * Component to handle all the logic of a Session
 * (waiting partcipants, display pages, ...)
 */
class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  get templateRef() {
    return db.collection("templates").doc(this.props.match.params.templateId);
  }

  get pinRef() {
    //console.log(this.sessionRef);
    return db.collection("pins").where("ref", "==", this.sessionRef);
  }
  get sessionRef() {
    return this.templateRef
      .collection("sessions")
      .doc(this.props.match.params.sessionId);
  }

  goNextStep(pageType, session) {
    if (pageType !== "QUESTION") {
      throw new Error("This is not a question");
    }
    let curQuestionStatusesIndex = questionStatuses.findIndex(
      x => session.curPageStatus && x === session.curPageStatus.questionStatus
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
          questionStatus: questionStatuses[newCurQuestionStatusesIndex]
        },
        curPageIndex: newCurPageIndex
      },
      { merge: true }
    );
  }

  resetStep() {
    this.sessionRef.set(
      {
        curStatus: "waitingParticipants",
        curPageStatus: {
          questionStatus: questionStatuses[0]
        },
        curPageIndex: 0
      },
      { merge: true }
    );
  }

  addNewUserInSessionIfNew(session) {
    if (!this.state.user) {
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          const user = {
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoUrl: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
            uid: firebaseUser.uid
          };
          this.setState({
            user
          });
          let newParticipants = [];
          if (session.participants) {
            newParticipants = session.participants;
          }
          if (!newParticipants.map(p => p.uid).includes(firebaseUser.uid)) {
            newParticipants.push(user);
          }

          this.sessionRef.set(
            { participants: newParticipants },
            { merge: true }
          );
        }
      });
    }
  }

  render() {
    return (
      <div className="Session">
        <FireContainer dbRef={this.templateRef}>
          {template => (
            <FireContainer dbRef={this.pinRef}>
              {pin => (
                <FireContainer dbRef={this.sessionRef}>
                  {session => {
                    // console.log("pin", pin);
                    this.addNewUserInSessionIfNew(session);
                    if (session.curStatus === "waitingParticipants") {
                      return (
                        <WaitingParticipants
                          pinValue={pin[0].value}
                          sessionRef={this.sessionRef}
                          participants={session.participants}
                        />
                      );
                    }
                    if (session.curPageIndex >= template.pages.length) {
                      return "It's over"; // TODO: Put a Component
                    }

                    const page = template.pages[session.curPageIndex];
                    if (page.type !== "QUESTION") {
                      throw new Error("This is not a question");
                    }
                    const questionRef = page.questionRef;
                    return (
                      <FireContainer dbRef={questionRef}>
                        {question => {
                          return (
                            <div>
                              <QuestionPage
                                user={this.state.user}
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
                    );
                  }}
                </FireContainer>
              )}
            </FireContainer>
          )}
        </FireContainer>
      </div>
    );
  }
}
export default Session;
