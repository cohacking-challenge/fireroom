import React from 'react';

const UserContext = React.createContext({
  user: null,
  changeUser: () => {},
});

export default UserContext;
