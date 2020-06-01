import React from "react";
import Toggleable from "./toggleable";

const blogStyle = {
  marginBottom: "0.4em",
  border: "solid",
  borderWidth: 1,
};

const Blog = ({ blog, onLikeClicked, onDeleteClicked }) => {
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
        <div>
          <button onClick={() => onDeleteClicked(blog)}>delete</button>
        </div>
      </Toggleable>
    </div>
  );
};

export default Blog;
