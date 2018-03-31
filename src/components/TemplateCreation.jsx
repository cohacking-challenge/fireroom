import React, { Component } from 'react';
import db from '../firebase/db';

class TemplateCreation extends Component {
  constructor(props) {
    super(props);
    this.addPage = this.addPage.bind(this);
    this.deletePage = this.deletePage.bind(this);
  }
  handleChange(event, ...fields) {
    let targetValue;
    if (event.target.type === 'checkbox') {
      targetValue = event.target.checked;
    } else {
      targetValue = event.target.value;
    }

    // Try to modify the value document[fields[0]]...[fields[n-1]]
    let newValue;
    if (fields.length === 0) {
      return;
    } else if (fields.length === 1) {
      newValue = targetValue;
    } else {
      newValue = this.props.template[fields[0]];
      let cursor = newValue;
      for (let i = 1; i < fields.length - 1; i++) {
        cursor = cursor[fields[i]];
      }
      cursor[fields[fields.length - 1]] = targetValue;
    }
    db
      .collection('templates')
      .doc(this.props.template.__id)
      .set({ [fields[0]]: newValue }, { merge: true });
  }

  addPage() {
    let newPages = this.props.template.pages;
    newPages.push({
      title: 'Question title',
      type: 'QUESTION',
      answers: Array(4).fill({
        label: 'Answer...',
        isCorrect: false,
      }),
    });
    db
      .collection('templates')
      .doc(this.props.template.__id)
      .set({ pages: newPages }, { merge: true });
  }

  deletePage(pageId) {
    let newPages = this.props.template.pages;
    newPages.splice(pageId, 1);
    db
      .collection('templates')
      .doc(this.props.template.__id)
      .set({ pages: newPages }, { merge: true });
  }

  addNewAnswer(pageId) {
    let newPages = this.props.template.pages;

    newPages[pageId].answers.push({
      isCorrect: false,
      label: 'Answer...',
    });

    db
      .collection('templates')
      .doc(this.props.template.__id)
      .set({ pages: newPages }, { merge: true });
  }

  deleteAnswer(pageId, answerId) {
    let newPages = this.props.template.pages;
    newPages[pageId].answers.splice(answerId, 1);
    db
      .collection('templates')
      .doc(this.props.template.__id)
      .set({ pages: newPages }, { merge: true });
  }

  render() {
    return (
      <div className="TemplateCreation">
        <h2>Hello TemplateCreation</h2>
        <p>This component is here to edit one specific Template!</p>
        <pre>{JSON.stringify(this.props.template, null, 2)}</pre>
        Name <br />
        <input
          type="text"
          onChange={e => {
            this.handleChange(e, 'name');
          }}
          value={this.props.template.name}
        />
        {this.props.template.pages &&
          this.props.template.pages.map((page, pageId) => (
            <div key={pageId}>
              <hr />
              Type <br />
              <select
                onChange={e => this.handleChange(e, 'pages', pageId, 'type')}
                value={this.props.template.pages[pageId].type}
              >
                <option value="QUESTION">Question</option>
                <option value="OPEN_CHAT">Open Chat</option>
              </select>
              <br />
              Title <br />
              <input
                type="text"
                onChange={e => {
                  this.handleChange(e, 'pages', pageId, 'title');
                }}
                value={this.props.template.pages[pageId].title}
              />
              <br />
              {this.props.template.pages[pageId].type === 'OPEN_CHAT' ? (
                <div>
                  <br />
                </div>
              ) : (
                  <h3> Question</h3>
                )}
              {this.props.template.pages[pageId].type === 'QUESTION' &&
                this.props.template.pages[pageId].answers &&
                this.props.template.pages[pageId].answers.map(
                  (answer, answerId) => (
                    <div key={answerId}>
                      Answer {answerId + 1} <br />
                      <input
                        type="text"
                        onChange={e => {
                          this.handleChange(
                            e,
                            'pages',
                            pageId,
                            'answers',
                            answerId,
                            'label',
                          );
                        }}
                        value={
                          this.props.template.pages[pageId].answers[answerId]
                            .label
                        }
                      />
                      <input
                        type="checkbox"
                        onChange={e => {
                          this.handleChange(
                            e,
                            'pages',
                            pageId,
                            'answers',
                            answerId,
                            'isCorrect',
                          );
                        }}
                        checked={
                          this.props.template.pages[pageId].answers[answerId]
                            .isCorrect
                        }
                      />
                      <button
                        onClick={e => this.deleteAnswer(pageId, answerId)}
                      >
                        Delete answer
                      </button>
                    </div>
                  ),
                )}
              {this.props.template.pages[pageId].type === 'QUESTION' && (
                <button onClick={e => this.addNewAnswer(pageId)}>
                  Add new answer
                </button>
              )}
              <br />
              <button onClick={e => this.deletePage(pageId)}>
                Delete page
              </button>
            </div>
          ))}
        <hr />
        <button onClick={this.addPage}>Add page</button>
      </div>
    );
  }
}

export default TemplateCreation;
