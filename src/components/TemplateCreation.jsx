import React, { Component } from 'react';
import db from 'backend/db';
import { Link } from 'react-router-dom';
import { Form, Select, Input, Button, Checkbox } from 'antd';
import FireContainer from 'components/FireContainer';
const FormItem = Form.Item;
const Option = Select.Option;

class TemplateCreation extends Component {
  constructor(props) {
    super(props);
    this.addPage = this.addPage.bind(this);
    this.saveRoom = this.saveRoom.bind(this);
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

  handleChangeQuestion(event, questionRef, field) {
    let targetValue;
    if (event.target.type === 'checkbox') {
      targetValue = event.target.checked;
    } else {
      targetValue = event.target.value;
    }
    questionRef.set({ [field]: targetValue }, { merge: true });
  }

  handleAnswerChange(event, answers, questionRef, answerId, field) {
    let targetValue;
    if (event.target.type === 'checkbox') {
      targetValue = event.target.checked;
    } else {
      targetValue = event.target.value;
    }
    let newAnwers = answers.slice();
    newAnwers[answerId][field] = targetValue;
    questionRef.set({ answers: newAnwers }, { merge: true });
  }

  addPage() {
    db
      .collection('templates')
      .doc(this.props.template.__id)
      .collection('questions')
      .add({
        title: 'New page',
        answers: [
          { label: '', isCorrect: false },
          { label: '', isCorrect: false },
          { label: '', isCorrect: false },
          { label: '', isCorrect: false },
        ],
      })
      .then(questionRef => {
        let newPages = this.props.template.pages.slice();
        newPages.push({
          title: 'Question title',
          type: 'QUESTION',
          questionRef,
        });
        db
          .collection('templates')
          .doc(this.props.template.__id)
          .set({ pages: newPages }, { merge: true });
      });
  }

  saveRoom() {
    //console.log('props ', this.props);
  }

  deletePage(questionRef, pageId) {
    let newPages = this.props.template.pages;
    newPages.splice(pageId, 1);
    db
      .collection('templates')
      .doc(this.props.template.__id)
      .set({ pages: newPages }, { merge: true })
      .then(() => {
        questionRef.delete();
      });
  }

  addNewAnswer(answers, questionRef) {
    let newAnswers = answers.slice();
    newAnswers.push({ label: '...', isCorrect: false });

    questionRef.set({
      answers: newAnswers,
    });
  }

  deleteAnswer(answers, questionRef, answerId) {
    let newAnswers = answers.slice();
    newAnswers.splice(answerId, 1);

    questionRef.set({
      answers: newAnswers,
    });
  }

  render() {
    if (!this.props.template) return false;
    return (
      <div className="TemplateCreation" style={{ marginTop: 30 }}>
        <h2>Template Creation</h2>
        Room name <br />
        <Form layout="inline">
          <FormItem>
            <Input
              type="text"
              onChange={e => {
                this.handleChange(e, 'name');
              }}
              value={this.props.template.name}
            />
          </FormItem>
        </Form>
        {this.props.template.pages &&
          this.props.template.pages.map((page, pageId) => (
            <div key={pageId}>
              <hr />
              <FireContainer dbRef={page.questionRef}>
                {question => (
                  <div>
                    <Form layout="inline">
                      <FormItem>Type</FormItem>
                      <FormItem>
                        <Select
                          onChange={e => {}}
                          value={this.props.template.pages[pageId].type}
                        >
                          <Option value="QUESTION">Question</Option>
                        </Select>
                      </FormItem>
                    </Form>
                    <Form layout="inline">
                      <FormItem>Title</FormItem>
                      <FormItem>
                        <Input
                          type="text"
                          onChange={e =>
                            this.handleChangeQuestion(
                              e,
                              page.questionRef,
                              'title',
                            )
                          }
                          value={question.title}
                        />
                      </FormItem>
                    </Form>
                    {question.answers &&
                      question.answers.map((answer, answerId) => (
                        <Form key={answerId} layout="inline">
                          <FormItem>Answer {answerId + 1}</FormItem>

                          <FormItem>
                            <Input
                              placeholder="Answer"
                              onChange={e => {
                                this.handleAnswerChange(
                                  e,
                                  question.answers,
                                  page.questionRef,
                                  answerId,
                                  'label',
                                );
                              }}
                              value={answer.label}
                            />
                          </FormItem>
                          <FormItem>
                            <Checkbox
                              onChange={e => {
                                this.handleAnswerChange(
                                  e,
                                  question.answers,
                                  page.questionRef,
                                  answerId,
                                  'isCorrect',
                                );
                              }}
                              checked={answer.isCorrect}
                            />
                          </FormItem>
                          <FormItem>
                            <Button
                              onClick={e =>
                                this.deleteAnswer(
                                  question.answers,
                                  page.questionRef,
                                  answerId,
                                )
                              }
                            >
                              Delete answer
                            </Button>
                          </FormItem>
                        </Form>
                      ))}
                    {this.props.template.pages[pageId].type === 'QUESTION' && (
                      <Form key={'new-answer'} layout="inline">
                        <FormItem>
                          <Button
                            onClick={e =>
                              this.addNewAnswer(
                                question.answers,
                                page.questionRef,
                              )
                            }
                          >
                            Add new answer
                          </Button>
                        </FormItem>
                      </Form>
                    )}
                    <Form key={'delete-page'} layout="inline">
                      <FormItem>
                        <Button
                          onClick={e =>
                            this.deletePage(page.questionRef, pageId)
                          }
                        >
                          Delete page
                        </Button>
                      </FormItem>
                    </Form>
                  </div>
                )}
              </FireContainer>
            </div>
          ))}
        <hr />
        <Button onClick={this.addPage}>Add page</Button>
        <br />
        <br />
        <Link to="/" className="ant-btn">
          Save room
        </Link>
      </div>
    );
  }
}

export default TemplateCreation;
