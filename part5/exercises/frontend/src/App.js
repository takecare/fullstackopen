import React, { useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blog";
import localStorage from "./services/localstorage";
import Auth from "./components/auth";
import Blogs from "./components/blogs";
import NewBlog from "./components/newblog";
import Notification from "./components/notification";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState("");

  const loadUserEffect = () => {
    const user = localStorage.read("user");
    if (user) {
      setUser(user);
    }
  };
  useEffect(loadUserEffect, []);

  const getBlogsEffect = () => {
    const getBlogs = async () => {
      try {
        const fetchedBlogs = await blogService.read();
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error(error);
      }
    };
    getBlogs();
  };
  useEffect(getBlogsEffect, []);

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

  const handleBlogAdded = (blog) => {
    setBlogs(blogs.concat(blog));
    setNotification("added");
  };

  const handleNotificationHidden = () => {
    setNotification("");
  };

  const newBlogComponent = user != null && (
    <>
      <h3>add new blog</h3>
      <NewBlog user={user} onBlogAdded={handleBlogAdded} />
    </>
  );

  return (
    <div>
      <h3>blogs</h3>
      <Notification
        message={notification}
        onHidden={handleNotificationHidden}
      />
      <Auth user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <Blogs user={user} blogs={blogs} />
      {newBlogComponent}
    </div>
  );
}

export default App;
