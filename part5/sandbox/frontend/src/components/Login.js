import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginInternal = (event) => {
    event.preventDefault();
    handleLogin(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLoginInternal}>
      <div>
        <input
          name="Username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <input
          name="Password"
          value={password}
          type="password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
