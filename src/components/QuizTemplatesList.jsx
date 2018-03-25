import React, { Component } from 'react';
import QuizTemplate from './QuizTemplate';

class QuizTemplatesList extends Component {
  render() {
    return (
      <ul>
        {this.props.quizTemplates.map(quizTemplate => (
          <QuizTemplate name={quizTemplate.name} key={quizTemplate.__id} />
        ))}
      </ul>
    );
  }
}

export default QuizTemplatesList;
