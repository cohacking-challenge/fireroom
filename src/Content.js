import React, { Component } from 'react';

import Question from './components/Question';
import FireContainer from './components/FireContainer';
import db from './firebase/db';

class Content extends Component {
  render() {
    return (
      <FireContainer
        dbRef={db.collection('questions').doc('0yNwV7pbYVOOaM4QwQKc')}
      >
        {(question, snapshot, dbRef) => {
          return (
            question && (
              <Question
                label={question.label}
                answers={question.answers}
                onAnswerIsCorrectChange={(index, isCorrect) => {
                  const answers = question.answers.slice();
                  answers[index].isCorrect = isCorrect;
                  dbRef.set(
                    {
                      answers,
                    },
                    { merge: true },
                  );
                }}
              />
            )
          );
        }}
      </FireContainer>
    );
  }
}

export default Content;
