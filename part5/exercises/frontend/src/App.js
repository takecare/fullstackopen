import React, { useState } from "react";
import loginService from "./services/login";
import Auth from "./components/auth";
import Blogs from "./components/blogs";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login(username, password);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <h3>blogs</h3>
      <Auth user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
      <Blogs user={user} />
    </div>
  );
}

export default App;
