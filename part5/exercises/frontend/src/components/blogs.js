import React from "react";
import Blog from "./blog";

const Blogs = ({ blogs, onLikeClicked, onDeleteClicked }) => {
  return (
    <div style={{ margin: "0.8em" }}>
      {blogs.map((blog) => (
        <div>
          <Blog
            key={blog.id}
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
