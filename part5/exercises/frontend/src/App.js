import React, { useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blog";
import localStorage from "./services/localstorage";
import Auth from "./components/auth";
import Blogs from "./components/blogs";
import NewBlog from "./components/newblog";
import Notification from "./components/notification";
import "./App.css";

const blogsSorter = (aBlog, anotherBlog) => {
  if (aBlog.likes > anotherBlog.likes) {
    return -1;
  } else if (aBlog.likes === anotherBlog.likes) {
    return 0;
  } else {
    return 1;
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [storedTimeout, saveTimeout] = useState(null);

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
        setBlogs(fetchedBlogs.sort(blogsSorter));
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
      displayError("Could not login");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.remove("user");
  };

  const handleBlogAdded = (blog) => {
    setBlogs(blogs.concat(blog));
    displayMessage(`Added "${blog.title}"`);
  };

  const handleLikeClicked = async (blog) => {
    const updated = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      const updatedBlog = await blogService.update(updated, user);
      const updatedBlogs = blogs
        .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        .sort(blogsSorter);
      setBlogs(updatedBlogs);
    } catch (error) {
      displayError("Could not like blog");
    }
  };

  const handleDeleteClicked = async (blog) => {
    try {
      await blogService.remove(blog.id, user);
      setBlogs(blogs.filter((item) => blog.id !== item.id));
    } catch (error) {
      displayError("Could not delete blog");
    }
  };

  const handleFailToAdd = () => {
    displayError("Could not add blog");
  };

  const displayError = (text) => {
    displayNotification(text, true);
  };

  const displayMessage = (text) => {
    displayNotification(text, false);
  };

  const displayNotification = (message, isError) => {
    clearTimeout(storedTimeout);
    const timeout = setTimeout(() => {
      saveTimeout(null);
      setNotification(null);
    }, 5000);
    saveTimeout(timeout);
    setNotification({ message, isError });
  };

  return (
    <div>
      <h3>blogs</h3>
      <Notification notification={notification} />
      <Auth user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <Blogs
        user={user}
        blogs={blogs}
        onLikeClicked={handleLikeClicked}
        onDeleteClicked={handleDeleteClicked}
      />
      <NewBlog
        user={user}
        onBlogAdded={handleBlogAdded}
        onFailToAdd={handleFailToAdd}
      />
    </div>
  );
}

export default App;
