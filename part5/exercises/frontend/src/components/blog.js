import React from 'react';
import Toggleable from './Toggleable';

const blogStyle = {
  marginBottom: '0.4em',
  border: 'solid',
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
    <div data-testid="delete">
      <button onClick={() => onDeleteClickedInternal(blog)}>delete</button>
    </div>
  );

  // TODO use context api to provide the "user" instead of passing it all
  // the way down here

  return (
    <div data-testid="blog" style={blogStyle}>
      <span data-testid="title">{blog.title}</span>
      <span data-testid="author"> by {blog.author}</span>
      <Toggleable
        data-testid="blog-details"
        showLabel="details"
        hideLabel="hide"
      >
        <div data-testid="url">
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div data-testid="likes">
          <span data-testid="count">{blog.likes} likes</span>
          <button data-testid="like" onClick={() => onLikeClicked(blog)}>
            like
          </button>
        </div>
        {user && user.username === blog.user.username ? deleteButton : <></>}
      </Toggleable>
    </div>
  );
};

export default Blog;
