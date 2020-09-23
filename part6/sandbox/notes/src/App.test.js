import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders note", () => {
  const { getByText } = render(<App />);
  const noteElement = getByText(/the app state is in redux store/i);
  expect(noteElement).toBeInTheDocument();
});
