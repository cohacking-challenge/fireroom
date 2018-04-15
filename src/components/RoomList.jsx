import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

class RoomList extends Component {
  render() {
    return this.props.templates.map(template => (
      <Row key={template.templateId}>
        <Col span={12} offset={6}>
          <Link to={`/templates/${template.templateId}`}>
            <Button type="primary">{template.templateData.name}</Button>
          </Link>
        </Col>
      </Row>
    ));
  }
}

export default RoomList;
