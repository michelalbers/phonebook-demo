import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { ContactForm } from "./ContactForm";

test("renders without errors and matches snapshot", () => {
  const tree = render(<ContactForm onSave={() => {}} />);
  expect(tree).toMatchSnapshot();
});

test("should display error messages when submitting an invalid form", async () => {
  render(<ContactForm onSave={() => {}} />);
  const submitButton = screen.getByText(/save contact/i);
  submitButton.click();

  await waitFor(() =>
    expect(screen.getByText(/please provide a name/gi)).toBeInTheDocument()
  );

  await waitFor(() =>
    expect(
      screen.getByText(/please provide a phonenumber/gi)
    ).toBeInTheDocument()
  );
});

test("should call onSave if submitting a valid form", async () => {
  const onSave = jest.fn();
  render(<ContactForm onSave={onSave} />);
  const submitButton = screen.getByText(/save contact/i);

  const nameInput = screen.getByTestId("name-input");
  const phoneNumberInput = screen.getByTestId("phonenumber-input");

  act(() => {
    fireEvent.change(nameInput, {
      target: { value: "Foo Name" },
    });

    fireEvent.change(phoneNumberInput, {
      target: { value: "+491234566789" },
    });
  });

  submitButton.click();

  await waitFor(() =>
    expect(onSave).toHaveBeenCalledWith({
      name: "Foo Name",
      phoneNumber: "+491234566789",
    })
  );
});

// TODO: Test rendering of an initial contact for edit mode
