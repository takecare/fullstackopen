import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import NewNote from "./NewNote";

describe("<NewNote />", () => {
  test("submitting calls the handler", () => {
    const mockHandler = jest.fn();
    const component = render(<NewNote handleAddNote={mockHandler} />);
    const input = component.container.querySelector("input");
    const button = component.container.querySelector("button");

    fireEvent.change(input, {
      target: { value: "a note" },
    });

    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toBe("a note");
    expect(input.value).toBe("");
  });
});
