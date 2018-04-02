import React, { Component } from 'react';
import db from 'backend/db';

class QuizTemplateBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  handleQuizTemplateCreation() {
    this.props.onQuizTemplateCreation(this.state);
    this.setState({ name: '' });
  }
  render() {
    return (
      <form>
        <input
          placeholder="name"
          value={this.state.name}
          onChange={e => {
            this.setState({ name: e.target.value });
          }}
        />
        <button onClick={() => this.handleQuizTemplateCreation()} type="button">
          Add
        </button>
      </form>
    );
  }
}

export default QuizTemplateBuilder;
