import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

// https://testing-library.com/docs/react-testing-library/cheatsheet
// https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change

describe('<Blog />', () => {
  test('renders author and title', () => {
    const blog = { title: 'title', author: 'author' };

    const component = render(<Blog blog={blog} />);
    const title = component.queryByTestId('title');
    const author = component.queryByTestId('author');

    expect(title).toHaveTextContent(blog.title);
    expect(author).toHaveTextContent(blog.author);
  });

  test('extra content is hidden by default', () => {
    const blog = { title: 'title', author: 'author', url: 'url', likes: 88 };

    const component = render(<Blog blog={blog} />);
    const toggleable = component.queryByTestId('toggleable-content');

    expect(toggleable).toHaveStyle('display: none');
  });

  test('displays likes and url when button is clicked', () => {
    const blog = { title: 'title', author: 'author', url: 'url', likes: 88 };

    const component = render(<Blog blog={blog} />);
    const toggleable = component.queryByTestId('toggleable-content');
    const likes = component.queryByTestId('likes');
    const url = component.queryByTestId('url');
    const button = component.container.querySelector('button');
    fireEvent.click(button);

    expect(toggleable).not.toHaveStyle('display: none');
    expect(likes).toHaveTextContent(blog.likes);
    expect(url).toHaveTextContent(blog.url);
  });

  test('can like a blog twice', () => {
    const blog = { title: 'title', author: 'author', url: 'url', likes: 88 };
    const onLikeClicked = jest.fn();

    const component = render(
      <Blog blog={blog} onLikeClicked={onLikeClicked} />
    );
    const likeButton = component.queryByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(onLikeClicked.mock.calls).toHaveLength(2);
  });
});
