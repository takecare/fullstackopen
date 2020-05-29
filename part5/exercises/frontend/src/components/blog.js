import React from "react";

const Blog = ({ blog }) => {
  return (
    <div>
      <span>
        "{blog.title}" by {blog.author},&nbsp;
      </span>
      <a href={blog.url}>{blog.url}</a>
    </div>
  );
};

export default Blog;
