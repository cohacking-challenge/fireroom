import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

class Signup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

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
          onClick={() => {
            console.log(getFieldValue('pin'));
          }}
        >
          Primary
        </Button>
      </Form>
    );
  }
}
export default Form.create()(Signup);
