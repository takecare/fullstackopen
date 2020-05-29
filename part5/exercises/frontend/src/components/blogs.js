import React from "react";
import Blog from "./blog";

const Blogs = ({ blogs, onDeleteClicked }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onDeleteClicked={onDeleteClicked} />
      ))}
    </div>
  );
};

export default Blogs;
