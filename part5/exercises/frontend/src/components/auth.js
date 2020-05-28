import React from "react";
import Login from "./login";
import Logout from "./logout";

const Auth = ({ user, handleLogin, handleLogout }) => {
  return user ? (
    <>
      <div>{user.username}</div>
      <Logout handleLogout={handleLogout} />
    </>
  ) : (
    <Login handleLogin={handleLogin} />
  );
};

export default Auth;
