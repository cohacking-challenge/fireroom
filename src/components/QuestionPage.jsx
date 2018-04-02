import React, { Component } from 'react';
import AnswerCard from './AnswerCard';

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
        <h2>{this.props.page.title}</h2>
        {this.props.pageStatus === 'showAnswers' &&
          this.props.page.answers.map((answer, i) => (
            <AnswerCard key={i}>{answer.label}</AnswerCard>
          ))}

        {this.props.pageStatus === 'showResponses' &&
          this.props.page.answers.map((answer, i) => (
            <AnswerCard
              key={i}
              nbVoters={this.nbVotersPerAnswer[i]}
              totalVoters={this.props.responses.length}
            >
              {answer.label}
            </AnswerCard>
          ))}

        {this.props.pageStatus === 'showCorrectAnswer' &&
          this.props.page.answers.map((answer, i) => (
            <AnswerCard
              key={i}
              nbVoters={this.nbVotersPerAnswer[i]}
              totalVoters={this.props.responses.length}
              isTransparent={!answer.isCorrect}
            >
              {answer.label}
            </AnswerCard>
          ))}
      </div>
    );
  }
}
export default QuestionPage;
