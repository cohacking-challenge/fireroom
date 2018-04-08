import React, { Component } from 'react';
import AnswerCard from './AnswerCard';

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
        <h2>{this.props.question.title}</h2>
        {this.props.questionStatus === 'showAnswers' &&
          this.props.question.answers.map((answer, i) => (
            <AnswerCard key={i}>{answer.label}</AnswerCard>
          ))}

        {this.props.questionStatus === 'showResponses' &&
          this.props.question.answers.map((answer, i) => (
            <AnswerCard
              key={i}
              nbVoters={nbVotersPerAnswer[i]}
              totalVoters={this.props.responses && this.props.responses.length}
            >
              {answer.label}
            </AnswerCard>
          ))}

        {this.props.questionStatus === 'showCorrectAnswer' &&
          this.props.question.answers.map((answer, i) => (
            <AnswerCard
              key={i}
              nbVoters={nbVotersPerAnswer[i]}
              totalVoters={this.props.responses && this.props.responses.length}
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
