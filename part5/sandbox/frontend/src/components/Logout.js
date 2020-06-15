import React from 'react';

const Logout = ({ user, handleLogout }) => {
  return (
    <div>
      <div>{user.username}</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
