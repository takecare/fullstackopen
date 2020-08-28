import React, { useState } from 'react';

const NewUser = ({ handleNewUser }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleNewUserInternal = (event) => {
    event.preventDefault();
    handleNewUser(name, username, password);
    setName('');
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleNewUserInternal}>
      <div>
        <label htmlFor="name">name</label>
        <input
          id="name"
          name="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="username">username</label>
        <input
          id="username"
          name="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          id="password"
          name="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button id="signup" type="submit">
        signup
      </button>
    </form>
  );
};

export default NewUser;
