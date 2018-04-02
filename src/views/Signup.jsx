import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

class Signup extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('pin', {
            rules: [{ required: true, message: 'Please input a pin!' }],
          })(<Input type="Number" placeholder="Pin" />)}
        </Form.Item>
        <Button
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
export default Form.create()(Signup);
