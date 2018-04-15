import React, { Component } from 'react';
import { Button, Layout } from 'antd';
const { Footer } = Layout;

class SessionNavigation extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 32: // space
        this.props.goNextStep(this.props.pageType, this.props.session);
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <Footer>
        <Button onClick={this.props.resetStep}>Reset</Button>
        <Button
          onClick={() =>
            this.props.goNextStep(this.props.pageType, this.props.session)
          }
        >
          Next
        </Button>
      </Footer>
    );
  }
}
export default SessionNavigation;
