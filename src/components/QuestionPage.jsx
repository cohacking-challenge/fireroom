import React, { Component } from 'react';
import AnswerCard from './AnswerCard';
import Player from './Player';
import { Row, Col } from 'antd';

/**
 * Component to handle all the logic of a Question Page
 */

class QuestionPage extends Component {
  render() {
    let nbVotersPerAnswer = [];
    if (
      Array.isArray(this.props.question.answers) &&
      Array.isArray(this.props.responses)
    ) {
      for (let i = 0; i < this.props.question.answers.length; i++) {
        nbVotersPerAnswer.push(
          this.props.responses.filter(x => x.answerIndex === i).length,
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
                <AnswerCard>{answer.label}</AnswerCard>
              </Col>
            ))}

          {this.props.questionStatus === 'showResponses' &&
            this.props.question.answers.map((answer, i) => (
              <Col key={i} md={12}>
                <AnswerCard
                  nbVoters={nbVotersPerAnswer[i]}
                  totalVoters={
                    this.props.responses && this.props.responses.length
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
                    this.props.responses && this.props.responses.length
                  }
                  isTransparent={!answer.isCorrect}
                >
                  {answer.label}
                </AnswerCard>
              </Col>
            ))}
        </div>
        <Player />
      </div>
    );
  }
}
export default QuestionPage;
