import { Component } from 'react';
import db from 'backend/db';

class NewRoom extends Component {
  componentDidMount() {
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
        throw new Error('Error adding document: ', error);
      });
  }
  render() {
    return 'Loading...';
  }
}

export default NewRoom;
