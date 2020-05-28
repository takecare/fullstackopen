import React, { useEffect, useState } from "react";
import blogService from "../services/blog";
import Blog from "./blog";

const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([]);

  const getBlogsEffect = () => {
    const getBlogs = async () => {
      try {
        const fetchedBlogs = await blogService.read();
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error(error);
      }
    };
    getBlogs();
  };
  useEffect(getBlogsEffect, []);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
