import React, { Component } from 'react';
import QuizTemplatesList from './QuizTemplatesList';
import FireContainer from './FireContainer';
import db from 'backend/db';

class QuizTemplatesListContainer extends Component {
  render() {
    return (
      <FireContainer dbRef={db.collection('quizTemplates')}>
        {data => data && <QuizTemplatesList quizTemplates={data} />}
      </FireContainer>
    );
  }
}

export default QuizTemplatesListContainer;
