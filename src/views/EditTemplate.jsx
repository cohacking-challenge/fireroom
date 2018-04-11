import React, { Component } from 'react';
import db from 'backend/db';
import TemplateCreation from 'components/TemplateCreation';
import FireContainer from 'components/FireContainer';

class NewRoom extends Component {
  render() {
    let templateId = this.props.match.params.templateId;
    return (
      <FireContainer dbRef={db.collection('templates').doc(templateId)}>
        {data => <TemplateCreation template={data} />}
      </FireContainer>
    );
  }
}

export default NewRoom;
