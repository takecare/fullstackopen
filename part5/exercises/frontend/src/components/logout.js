import React from 'react';

const Logout = ({ onLogout }) => {
  return (
    <button id="logout" onClick={onLogout}>
      Logout
    </button>
  );
};

export default Logout;
