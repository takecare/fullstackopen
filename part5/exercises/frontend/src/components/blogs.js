import React from "react";
import Blog from "./Blog";

const Blogs = ({ blogs, user, onLikeClicked, onDeleteClicked }) => {
  return (
    <div style={{ margin: "0.8em" }}>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Blog
            blog={blog}
            user={user}
            onLikeClicked={onLikeClicked}
            onDeleteClicked={onDeleteClicked}
          />
        </div>
      ))}
    </div>
  );
};

export default Blogs;
