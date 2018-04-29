import React, { Component } from 'react';
import AnswerCard from './AnswerCard';
import PlayersIconList from 'components/PlayersIconList';
import { JSONDeepCopy } from '../../utils';
import { Col } from 'antd';

import './style.less';

/**
 * Component to handle all the logic of a Question Page
 */

class QuestionPage extends Component {
  static defaultProps = {
    participants: [],
  };

  handleClick(answerIndex) {
    if (this.props.userIsOwner) return;

    let newResponses = JSONDeepCopy(this.props.responses);

    if (!newResponses[this.props.question.__id]) {
      newResponses[this.props.question.__id] = [];
    }

    if (
      !newResponses[this.props.question.__id]
        .map(r => r.uid)
        .includes(this.props.user.uid)
    ) {
      newResponses[this.props.question.__id].push({
        answerIndex: answerIndex,
        uid: this.props.user.uid,
      });
    }

    this.props.sessionRef.set({ responses: newResponses }, { merge: true });
  }

  getParticipantsWhoAnswered() {
    if (!this.props.responsesOfQuestion) return [];
    let res = [];
    for (let iR = 0; iR < this.props.responsesOfQuestion.length; iR++) {
      for (let iP = 0; iP < this.props.participants.length; iP++) {
        if (
          this.props.responsesOfQuestion[iR].uid ===
          this.props.participants[iP].uid
        )
          res.push(this.props.participants[iP]);
      }
    }
    return res;
  }

  computeNewScore() {
    if (!this.props.isScoreCalculated) {
      let newParticipants = JSONDeepCopy(this.props.participants);
      let scoreForQuestion = 120;
      let responseLength = this.props.responsesOfQuestion
        ? this.props.responsesOfQuestion.length
        : 0;
      for (let iR = 0; iR < responseLength; iR++) {
        for (let iP = 0; iP < newParticipants.length; iP++) {
          // If the current response if from the current participant and the response is correct
          if (
            newParticipants[iP].uid ===
              this.props.responsesOfQuestion[iR].uid &&
            this.props.question.answers[
              this.props.responsesOfQuestion[iR].answerIndex
            ].isCorrect
          ) {
            newParticipants[iP].score =
              (newParticipants[iP].score || 0) + scoreForQuestion;
            scoreForQuestion = Math.max(100, scoreForQuestion - 10);
          }
        }
      }
      let curPageStatus = {
        isScoreCalculated: true,
        questionStatus: 'showCorrectAnswer',
      };
      this.props.sessionRef.set(
        { curPageStatus, participants: newParticipants },
        { merge: true },
      );
    }
  }

  render() {
    if (
      this.props.questionStatus === 'showCorrectAnswer' &&
      this.props.userIsOwner
    ) {
      this.computeNewScore();
    }

    let nbVotersPerAnswer = [];
    if (
      Array.isArray(this.props.question.answers) &&
      Array.isArray(this.props.responsesOfQuestion)
    ) {
      for (let i = 0; i < this.props.question.answers.length; i++) {
        nbVotersPerAnswer.push(
          this.props.responsesOfQuestion.filter(x => x.answerIndex === i)
            .length,
        );
      }
    }

    let userResponseOfQuestion =
      this.props.responsesOfQuestion &&
      this.props.responsesOfQuestion.find(
        response => response.uid === this.props.user.uid,
      );
    let selectedAnswerIndex;
    if (userResponseOfQuestion)
      selectedAnswerIndex = userResponseOfQuestion.answerIndex;

    return (
      <div className="QuestionPage">
        <h1>{this.props.question.title}</h1>
        <div>
          {this.props.questionStatus === 'showAnswers' &&
            this.props.question.answers.map((answer, i) => (
              <Col key={i} md={12}>
                <AnswerCard
                  isSelected={i === selectedAnswerIndex}
                  onClick={() => this.handleClick(i)}
                >
                  {answer.label}
                </AnswerCard>
              </Col>
            ))}

          {this.props.questionStatus === 'showResponses' &&
            this.props.question.answers.map((answer, i) => (
              <Col key={i} md={12}>
                <AnswerCard
                  isSelected={i === selectedAnswerIndex}
                  nbVoters={nbVotersPerAnswer[i]}
                  totalVoters={
                    this.props.responsesOfQuestion &&
                    this.props.responsesOfQuestion.length
                  }
                >
                  {answer.label}
                </AnswerCard>
              </Col>
            ))}

          {this.props.questionStatus === 'showCorrectAnswer' &&
            this.props.question.answers.map((answer, i) => (
              <Col key={i} md={12}>
                <AnswerCard
                  isSelected={i === selectedAnswerIndex}
                  isTransparent={!answer.isCorrect}
                  nbVoters={nbVotersPerAnswer[i]}
                  totalVoters={
                    this.props.responsesOfQuestion &&
                    this.props.responsesOfQuestion.length
                  }
                >
                  {answer.label}
                </AnswerCard>
              </Col>
            ))}
        </div>
        <PlayersIconList players={this.getParticipantsWhoAnswered()} />
      </div>
    );
  }
}
export default QuestionPage;
