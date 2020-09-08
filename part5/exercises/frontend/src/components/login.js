import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLoginInternal = (event) => {
    event.preventDefault();
    onLogin(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <form id="login" onSubmit={handleLoginInternal}>
      <input
        name="username"
        id="username"
        value={username}
        type="text"
        onChange={handleUsernameChange}
      />
      <input
        name="password"
        id="password"
        value={password}
        type="password"
        onChange={handlePasswordChange}
      />
      <button type="submit">login</button>
    </form>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
