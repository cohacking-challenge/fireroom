import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './components/Question';

import FireContainer from './components/FireContainer';
import db from './firebase/db';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Jane Doe',
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. Hello{' '}
          {this.state.name}
        </p>
        <FireContainer
          dbRef={db.collection('questions').doc('0yNwV7pbYVOOaM4QwQKc')}
        >
          {(question, snapshot, dbRef) => {
            // Equivalent to
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
    );
  }
}

export default App;
