import React from "react";
import Toggleable from "./toggleable";

const blogStyle = {
  marginBottom: "0.4em",
  border: "solid",
  borderWidth: 1,
};

const Blog = ({ blog, user, onLikeClicked, onDeleteClicked }) => {
  const onDeleteClickedInternal = (blog) => {
    const result = window.confirm(`Remove blog "${blog.title}"?`);
    if (result) {
      onDeleteClicked(blog);
    }
  };

  const deleteButton = (
    <div>
      <button onClick={() => onDeleteClickedInternal(blog)}>delete</button>
    </div>
  );

  return (
    <div style={blogStyle}>
      <span>{blog.title}</span>
      <Toggleable showLabel="details" hideLabel="hide">
        <div>by {blog.author}</div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes
          <button onClick={() => onLikeClicked(blog)}>like</button>
        </div>
        {user.id === blog.user.id ? deleteButton : <></>}
      </Toggleable>
    </div>
  );
};

export default Blog;
