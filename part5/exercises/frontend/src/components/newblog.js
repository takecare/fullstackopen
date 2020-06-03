import React, { useState, useRef } from "react";
import Toggleable from "./toggleable";
import blogService from "../services/blog";

const NewBlog = ({ user, onBlogAdded, onFailToAdd }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const toggleableRef = useRef();

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({ title, author, url }, user);
      setTitle("");
      setAuthor("");
      setUrl("");
      onBlogAdded(newBlog);
      toggleableRef.current.toggle();
    } catch (error) {
      onFailToAdd(error);
    }
  };

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handleUrlChange = (event) => setUrl(event.target.value);

  const component = (
    <Toggleable showLabel="new blog" ref={toggleableRef}>
      <h3>add new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title</label>
          <input name="title" id="title" type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input name="author" id="author" type="text" value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input name="url" id="url" type="text" value={url} onChange={handleUrlChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </Toggleable>
  );

  return user !== null ? component : <></>;
};

export default NewBlog;
