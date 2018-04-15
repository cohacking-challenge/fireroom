import React, { Component } from 'react';
import db from 'backend/db';
import UserContext from 'contexts/UserContext';

class NewRoom extends Component {
  componentDidMount() {
    console.log('props ', this.props.user.uid);
    this.createTemplate();
  }

  createTemplate() {
    db
      .collection('templates')
      .add({
        name: 'New template',
        pages: [],
        //To do
        ownerUid: this.props.user.uid,
      })
      .then(docRef => {
        this.props.moveToTemplatePage(docRef.id);
      })
      .catch(error => {
        console.log('error ', error, 'props ', this.props);
        throw new Error('Error adding document: ', error);
      });
  }
  render() {
    return 'Loading...';
  }
}

export default NewRoom;
