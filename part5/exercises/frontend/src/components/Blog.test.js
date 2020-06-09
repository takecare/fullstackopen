import React from "react";
import { render } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  test("", () => {
    const blog = { title: "title", author: "author" };

    const component = render(<Blog blog={blog} />);
    const title = component.container.querySelector(".title");
    const author = component.container.querySelector(".author");

    expect(title).toHaveTextContent(blog.title);
    expect(author).toHaveTextContent(blog.author);
  });
});
