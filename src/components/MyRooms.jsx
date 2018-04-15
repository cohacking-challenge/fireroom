import React, { Component } from 'react';
import db from 'backend/db';
class MyRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: [],
    };
    this.storeTemplates = this.storeTemplates.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
  }
  componentDidMount() {
    this.retrieveData();
  }

  storeTemplates(templateObject) {
    console.log('HERE');
    this.state.templates.push(templateObject);
  }

  retrieveData() {
    db
      .collection('templates')
      .where('ownerUid', '==', this.props.user.uid)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          let templateObject = {
            templateId: doc.id,
            templateData: doc.data(),
          };
          this.storeTemplates(templateObject);
        });
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
  }

  render() {
    return 'Loading...';
  }
}

export default MyRooms;
