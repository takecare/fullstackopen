import React from "react";
import Blog from "./blog";

const Blogs = ({ blogs, onLikeClicked, onDeleteClicked }) => {
  return (
    <div style={{ margin: "0.8em" }}>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Blog
            blog={blog}
            onLikeClicked={onLikeClicked}
            onDeleteClicked={onDeleteClicked}
          />
        </div>
      ))}
    </div>
  );
};

export default Blogs;
