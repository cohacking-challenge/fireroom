import React, { Component } from 'react';
import db from 'backend/db';

class NewRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.createTemplate();
  }

  createTemplate() {
    db
      .collection('templates')
      .add({
        name: 'New template',
        pages: [],
      })
      .then(docRef => {
        this.props.history.push(`/${docRef.path}`);
      })
      .catch(error => {
        throw new Error('Error adding document: ', error);
      });
  }
  render() {
    return 'Loading...';
  }
}

export default NewRoom;
