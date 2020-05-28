import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLoginInternal = (event) => {
    event.preventDefault();
    handleLogin(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleLoginInternal}>
      <input
        name="username"
        value={username}
        type="text"
        onChange={handleUsernameChange}
      />
      <input
        name="password"
        value={password}
        type="password"
        onChange={handlePasswordChange}
      />
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
