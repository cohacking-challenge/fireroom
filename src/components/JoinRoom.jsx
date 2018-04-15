import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import db from 'backend/db';

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const { getFieldValue } = this.props.form;
    console.log(event);
    db
      .collection('pins')
      .where('value', '==', getFieldValue('pin'))
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot);
      });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('pin', {
            rules: [{ required: true, message: 'Please input a pin!' }],
          })(<Input type="Text" placeholder="Pin" />)}
        </Form.Item>
        <Button
          htmlType="submit"
          style={{
            backgroundColor: 'red',
            color: 'white',
            borderColor: 'red',
          }}
        >
          Primary
        </Button>
      </Form>
    );
  }
}

export default Form.create()(JoinRoom);
