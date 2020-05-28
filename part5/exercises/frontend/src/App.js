import React, { useState, useEffect } from "react";
import loginService from "./services/login";
import localStorage from "./services/localstorage";
import Auth from "./components/auth";
import Blogs from "./components/blogs";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const loadUserEffect = () => {
    const user = localStorage.read("user");
    if (user) {
      setUser(user);
    }
  };
  useEffect(loadUserEffect, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login(username, password);
      localStorage.write("user", user);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.remove("user");
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
