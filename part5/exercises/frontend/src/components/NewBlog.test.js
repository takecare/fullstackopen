import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import NewBlog from './NewBlog';

// https://jestjs.io/docs/en/mock-functions
// https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning

const mockFetch = async (endpoint, options) => {
  if (endpoint.endsWith('/api/blogs')) {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        json: () =>
          new Promise((resolve, reject) => {
            resolve({});
          }),
      });
    });
  }
};

beforeAll(() => jest.spyOn(window, 'fetch'));
beforeEach(() => window.fetch.mockImplementation(mockFetch));

describe('<NewBlog />', () => {
  test('component is rendered', () => {
    const component = render(
      <NewBlog user={{}} onBlogAdded={() => {}} onFailToAdd={() => {}} />
    );

    const button = component.getByText('create');

    expect(button).toBeDefined();
  });

  // FIXME can't get rid of the act() warnings (even though all interactions are
  // wrapped in act())
  test('adds a new blog', async () => {
    let unlock;
    const lock = new Promise((resolve, reject) => (unlock = resolve));
    const onBlogAdded = jest.fn(() => unlock());

    const component = render(
      <NewBlog user={{}} onBlogAdded={onBlogAdded} onFailToAdd={() => {}} />
    );

    const form = component.container.querySelector('form');
    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    act(() => {
      type('title').on(title);
      type('author').on(author);
      type('url').on(url);
      fireEvent.submit(form);
    });

    await lock;

    expect(onBlogAdded.mock.calls).toHaveLength(1);
  });
});

const type = (text) => {
  const obj = {};
  const action = () => {
    fireEvent.change(obj.elem, {
      target: { value: text },
    });
  };
  return {
    on: (elem) => {
      obj.elem = elem;
      action();
    },
  };
};
