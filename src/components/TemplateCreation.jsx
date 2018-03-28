import React, { Component } from 'react';
import FireContainer from './FireContainer';
import db from '../firebase/db';

class TemplateCreation extends Component {
  constructor(props) {
    super(props);
    this.addPage = this.addPage.bind(this);
  }
  handleChange(event, ...fields) {
    // Try to modify the value document[fields[0]]...[fields[n-1]]
    let newValue;
    if (fields.length === 0) {
      return;
    } else if (fields.length === 1) {
      newValue = event.target.value;
    } else {
      newValue = this.props.template[fields[0]];
      let cursor = newValue;
      for (let i = 1; i < fields.length - 1; i++) {
        cursor = cursor[fields[i]];
      }
      cursor[fields[fields.length - 1]] = event.target.value;
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
    });
    db
      .collection('templates')
      .doc(this.props.template.__id)
      .set({ pages: newPages });
  }
  render() {
    return (
      <div className="TemplateCreation">
        <h2>Hello TemplateCreation</h2>
        <p>This component is here to edit one specific Template!</p>
        <p>{JSON.stringify(this.props.template)}</p>
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
              Title <br />
              <input
                type="text"
                onChange={e => {
                  this.handleChange(e, 'pages', pageId, 'title');
                }}
                value={this.props.template.pages[pageId].title}
              />
              <br />
              {/* Answer 1 <br />
              <input
                type="text"
                onChange={e => {
                  this.handleChange(e, 'pages', pageId, 'answers', 0);
                }}
                value={this.props.template.pages[pageId].title}
              /> */}
            </div>
          ))}
        <hr />
        <button onClick={this.addPage}>Add page</button>
      </div>
    );
  }
}

export default TemplateCreation;
