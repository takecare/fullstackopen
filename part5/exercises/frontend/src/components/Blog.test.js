import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  test("renders author and title", () => {
    const blog = { title: "title", author: "author" };

    const component = render(<Blog blog={blog} />);
    const title = component.container.querySelector(".title");
    const author = component.container.querySelector(".author");

    expect(title).toHaveTextContent(blog.title);
    expect(author).toHaveTextContent(blog.author);
  });

  test("extra content is hidden by default", () => {
    const blog = { title: "title", author: "author", url: "url", likes: 88 };

    const component = render(<Blog blog={blog} />);
    const toggleable = component.container.querySelector(".toggleable-content");

    expect(toggleable).toHaveStyle("display: none");
  });

  test("displays likes and url when button is clicked", () => {
    const blog = { title: "title", author: "author", url: "url", likes: 88 };

    const component = render(<Blog blog={blog} />);
    const toggleable = component.container.querySelector(".toggleable-content");
    const likes = component.container.querySelector(".likes");
    const url = component.container.querySelector(".url");
    const button = component.container.querySelector("button");
    fireEvent.click(button);

    expect(toggleable).not.toHaveStyle("display: none");
    expect(likes).toHaveTextContent(blog.likes);
    expect(url).toHaveTextContent(blog.url);
  });
});
