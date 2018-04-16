import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import FireContainer from 'components/FireContainer';

import db from 'backend/db';

class SessionsList extends Component {
  get templatesRef() {
    return db.collection('templates');
  }

  render() {
    return (
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
                          const link = `/templates/${template.__id}/sessions/${
                            session.__id
                          }`;
                          return (
                            <div>
                              {template.name + ': '}
                              <NavLink key={link} to={link}>
                                {link}
                              </NavLink>
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
    );
  }
}

export default SessionsList;
