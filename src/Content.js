import React, { Component } from 'react';

import Question from 'components/Question';
import QuizTemplateBuilder from 'components/QuizTemplateBuilder';
import FireContainer from 'components/FireContainer';
import db from 'backend/db';
import QuizTemplatesListContainer from 'components/QuizTemplatesListContainer';

class Content extends Component {
  render() {
    return (
      <div>
        <QuizTemplateBuilder
          onQuizTemplateCreation={data =>
            db.collection('quizTemplates').add(data)
          }
        />
        <QuizTemplatesListContainer />

        <div style={{ display: 'block' }}>
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
        </div>
      </div>
    );
  }
}

export default Content;
