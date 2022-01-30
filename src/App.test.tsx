import { render, screen } from "@testing-library/react";
import React from "react";
import { App } from "./App";

test("renders without errors and matches snapshot", () => {
  const tree = render(<App />);
  expect(tree).toMatchSnapshot();
});

test("renders the headline", () => {
  render(<App />);
  const headline = screen.getByText(/super smart phonebook 3000/i);
  expect(headline).toBeInTheDocument();
});
