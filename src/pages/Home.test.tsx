import { render, screen } from "@testing-library/react";
import React from "react";
import { HomePage } from "./Home";

test("renders without errors and matches the snapshot", () => {
  const tree = render(<HomePage />);
  expect(tree).toMatchSnapshot();
});

test("renders the new contact button", () => {
  render(<HomePage />);
  const contactButton = screen.getByText(/new contact/i);
  expect(contactButton).toBeInTheDocument();
});

test("should navigate to /new when clicking the button", () => {
  render(<HomePage />);
  const contactButton = screen.getByText(/new contact/i);
  expect(contactButton).toHaveAttribute("href", "/new");
});
