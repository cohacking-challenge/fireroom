import React, { Component } from 'react';
import db from 'backend/db';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import RoomList from 'components/RoomList';
import createTemplateWithSession from 'scripts/createTemplateWithSession';

class MyRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: [],
    };
    this.retrieveData = this.retrieveData.bind(this);
  }
  componentDidMount() {
    this.retrieveData();
  }

  retrieveData() {
    db
      .collection('templates')
      .where('ownerUid', '==', this.props.user.uid)
      .get()
      .then(querySnapshot => {
        const templates = querySnapshot.docs.map(doc => {
          // doc.data() is never undefined for query doc snapshots
          return {
            templateId: doc.id,
            templateData: doc.data(),
          };
        });
        this.setState({ templates });
      })
      .catch(function(error) {});
  }

  render() {
    return (
      <div>
        <br />
        <Row>
          <Col span={12} offset={6}>
            <h3>New</h3>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <Link to="/new-template" className="ant-btn">
              Create a new template
            </Link>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={12} offset={6}>
            <Button onClick={() => createTemplateWithSession()}>
              Generate a random template
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={12} offset={6}>
            <h3>My room templates</h3>
          </Col>
        </Row>
        {this.state.templates.length > 0 && (
          <RoomList templates={this.state.templates} />
        )}
      </div>
    );
  }
}

export default MyRooms;
