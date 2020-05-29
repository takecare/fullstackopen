import React from "react";

const Blog = ({ blog, onDeleteClicked }) => {
  return (
    <div>
      <span>
        "{blog.title}" by {blog.author},&nbsp;
      </span>
      <a href={blog.url}>{blog.url}</a>
      <button onClick={() => onDeleteClicked(blog)}>delete</button>
    </div>
  );
};

export default Blog;
