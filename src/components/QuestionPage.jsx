import React, { Component } from 'react';
import AnswerCard from './AnswerCard';
import PlayersIconList from './PlayersIconList';
import { Row, Col } from 'antd';

/**
 * Component to handle all the logic of a Question Page
 */

class QuestionPage extends Component {
  handleClick(answerIndex) {
    // Copy of this.props.responses
    let newResponses = JSON.parse(JSON.stringify(this.props.responses));
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

  render() {
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

    return (
      <div className="QuestionPage" style={{ minHeight: '70vh' }}>
        <h1 style={{ fontSize: '200%' }}>{this.props.question.title}</h1>
        <div style={{ marginTop: '5%' }}>
          {this.props.questionStatus === 'showAnswers' &&
            this.props.question.answers.map((answer, i) => (
              <Col key={i} md={12}>
                <AnswerCard onClick={() => this.handleClick(i)}>
                  {answer.label}
                </AnswerCard>
              </Col>
            ))}

          {this.props.questionStatus === 'showResponses' &&
            this.props.question.answers.map((answer, i) => (
              <Col key={i} md={12}>
                <AnswerCard
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
                  nbVoters={nbVotersPerAnswer[i]}
                  totalVoters={
                    this.props.responsesOfQuestion &&
                    this.props.responsesOfQuestion.length
                  }
                  isTransparent={!answer.isCorrect}
                >
                  {answer.label}
                </AnswerCard>
              </Col>
            ))}
        </div>
        <PlayersIconList
          players={this.props.participants.filter(p =>
            this.props.responsesOfQuestion.map(x => x.uid).includes(p.uid),
          )}
        />
      </div>
    );
  }
}
export default QuestionPage;
