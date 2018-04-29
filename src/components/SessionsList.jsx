import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import FireContainer from 'components/FireContainer';
import UserContext from 'contexts/UserContext';

import db from 'backend/db';
import { Button } from 'antd';

class SessionsList extends Component {
  get templatesRef() {
    return db.collection('templates');
  }

  handleDelete(sessionsRef, sessionId) {
    sessionsRef.doc(sessionId).delete();
  }

  render() {
    return (
      <UserContext.Consumer>
        {({ user }) => (
          <FireContainer dbRef={this.templatesRef}>
            {templates => (
              <div>
                <h2>Sessions List</h2>

                {templates.map(template => {
                  const sessionsRef = this.templatesRef
                    .doc(template.__id)
                    .collection('sessions');
                  return (
                    <FireContainer key={template.__id} dbRef={sessionsRef}>
                      {sessions => {
                        return (
                          <div>
                            {sessions.map(session => {
                              const link = `/templates/${
                                template.__id
                              }/sessions/${session.__id}`;
                              return (
                                <div>
                                  {template.name + ': '}
                                  <NavLink key={link} to={link}>
                                    {link}
                                  </NavLink>{' '}
                                  {template.ownerUid === user.uid && (
                                    <Button
                                      onClick={() =>
                                        this.handleDelete(
                                          sessionsRef,
                                          session.__id,
                                        )
                                      }
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      }}
                    </FireContainer>
                  );
                })}
              </div>
            )}
          </FireContainer>
        )}
      </UserContext.Consumer>
    );
  }
}

export default SessionsList;
