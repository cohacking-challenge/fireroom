import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import db from 'backend/db';
import createTemplateWithSession from 'scripts/createTemplateWithSession';

class RoomList extends Component {
  handleClick(templateId) {
    db
      .collections('templates')
      .doc(templateId)
      .collections('sessions')
      .add({
        curStatus: 'waitingParticipants',
        curPageIndex: 0,
        curPageStatus: { questionStatus: 'showTitle' },
      });
  }
  render() {
    // createTemplateWithSession();
    return (
      <div style={{ textAlign: 'right', display: 'inline-block' }}>
        {this.props.templates.map(template => (
          <div key={template.templateId}>
            {template.templateData.name}:{' '}
            <Link className="ant-btn" to={`/templates/${template.templateId}`}>
              Edit
            </Link>{' '}
            <Button onClick={() => this.handleClick(template.templateId)}>
              Launch a room
            </Button>
          </div>
        ))}
      </div>
    );
  }
}

export default RoomList;
