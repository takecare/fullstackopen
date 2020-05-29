import React from "react";
import Login from "./login";
import Logout from "./logout";

const Auth = ({ user, onLogin, onLogout }) => {
  return user ? (
    <>
      <div>{user.username}</div>
      <Logout onLogout={onLogout} />
    </>
  ) : (
    <Login onLogin={onLogin} />
  );
};

export default Auth;
