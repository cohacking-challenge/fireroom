import React, { Component } from 'react';
import AnswerCard from './AnswerCard';
import Player from './Player';
import { Row, Col } from 'antd';

/**
 * Component to handle all the logic of a Question Page
 */

class QuestionPage extends Component {
  render() {
    this.nbVotersPerAnswer = [];
    for (let i = 0; i < this.props.page.answers.length; i++) {
      this.nbVotersPerAnswer.push(
        this.props.responses.filter(x => x.answerIndex === i).length,
      );
    }

    return (
      <div className="QuestionPage" style={{ minHeight: '70vh' }}>
        <h1 style={{ fontSize: '200%' }}>{this.props.page.title}</h1>
        <div style={{ marginTop: '5%' }}>
          {this.props.pageStatus === 'showAnswers' &&
            this.props.page.answers.map((answer, i) => (
              <Col key={i} md={12}>
                <AnswerCard key={i}>{answer.label}</AnswerCard>
              </Col>
            ))}

          {this.props.pageStatus === 'showResponses' &&
            this.props.page.answers.map((answer, i) => (
              <Col md={12}>
                <AnswerCard
                  key={i}
                  nbVoters={this.nbVotersPerAnswer[i]}
                  totalVoters={this.props.responses.length}
                >
                  {answer.label}
                </AnswerCard>
              </Col>
            ))}

          {this.props.pageStatus === 'showCorrectAnswer' &&
            this.props.page.answers.map((answer, i) => (
              <Col md={12}>
                <AnswerCard
                  key={i}
                  nbVoters={this.nbVotersPerAnswer[i]}
                  totalVoters={this.props.responses.length}
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
