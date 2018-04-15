import React, { Component } from 'react';
import NewRoom from 'components/NewRoom';
import UserContext from 'contexts/UserContext';

class NewTemplate extends Component {
  constructor(props) {
    super(props);
    this.moveToTemplatePage = this.moveToTemplatePage.bind(this);
  }

  moveToTemplatePage(templateId) {
    this.props.history.push(`/templates/${templateId}`);
  }
  render() {
    return (
      <UserContext.Consumer>
        {({ user }) => (
          <NewRoom user={user} moveToTemplatePage={this.moveToTemplatePage} />
        )}
      </UserContext.Consumer>
    );
  }
}

export default NewTemplate;
