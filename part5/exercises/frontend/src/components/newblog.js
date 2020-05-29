import React, { useState } from "react";
import blogService from "../services/blog";

const NewBlog = ({ user, onBlogAdded }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({ title, author, url }, user);
      setTitle("");
      setAuthor("");
      setUrl("");
      onBlogAdded(newBlog);
    } catch (error) {
      //
    }
  };

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handleUrlChange = (event) => setUrl(event.target.value);

  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="title">title</label>
        <input
          name="title"
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label htmlFor="author">author</label>
        <input
          name="author"
          id="author"
          type="text"
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        <label htmlFor="url">url</label>
        <input
          name="url"
          id="url"
          type="text"
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default NewBlog;
