import React, { Component } from 'react';

class Question extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.label}</h2>
        <ul>
          {this.props.answers.map((answer, index) => (
            <li>
              {answer.label}
              <input
                type="checkbox"
                checked={answer.isCorrect}
                onChange={event =>
                  this.props.onAnswerIsCorrectChange(
                    index,
                    event.target.checked,
                  )
                }
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Question;
