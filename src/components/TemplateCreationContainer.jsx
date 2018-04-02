import React, { Component } from 'react';
import FireContainer from './FireContainer';
import TemplateCreation from './TemplateCreation';
import db from 'backend/db';

class TemplateCreationContainer extends Component {
  render() {
    return (
      <div className="TemplateCreationContainer">
        <FireContainer
          dbRef={db.collection('templates').doc('Gy3XDxWihs18sDXTU0Ej')}
        >
          {data => data && <TemplateCreation template={data} />}
        </FireContainer>
      </div>
    );
  }
}

export default TemplateCreationContainer;
