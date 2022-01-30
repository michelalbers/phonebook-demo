import { render, screen } from "@testing-library/react";
import React from "react";
import { Contact, ContactDbContext } from "../hooks/useContactDb";
import { ContactList } from "./ContactList";

const contacts: Contact[] = [
  { id: "foo", name: "foo", phoneNumber: "+491234567" },
  { id: "bar", name: "bar", phoneNumber: "+492345678" },
  { id: "bazz", name: "bazz", phoneNumber: "+493456789" },
];

test("renders without errors and matches snapshot", () => {
  const tree = render(
    <ContactDbContext.Provider
      value={{
        contacts,
        addContact: () => {},
        removeContact: () => {},
        updateContact: () => {},
      }}
    >
      <ContactList />
    </ContactDbContext.Provider>
  );

  expect(tree).toMatchSnapshot();
});

test("renders a list of contacts", () => {
  render(
    <ContactDbContext.Provider
      value={{
        contacts,
        addContact: () => {},
        removeContact: () => {},
        updateContact: () => {},
      }}
    >
      <ContactList />
    </ContactDbContext.Provider>
  );

  const fooRow = screen.getByText(contacts[0].phoneNumber);
  const barRow = screen.getByText(contacts[0].phoneNumber);
  const bazzRow = screen.getByText(contacts[0].phoneNumber);

  expect(fooRow).toBeInTheDocument();
  expect(barRow).toBeInTheDocument();
  expect(bazzRow).toBeInTheDocument();
});

test("should link to editor page", () => {
  const contacts: Contact[] = [
    { id: "foo", name: "foo", phoneNumber: "+491234567" },
    { id: "bar", name: "bar", phoneNumber: "+492345678" },
    { id: "bazz", name: "bazz", phoneNumber: "+493456789" },
  ];

  render(
    <ContactDbContext.Provider
      value={{
        contacts,
        addContact: () => {},
        removeContact: () => {},
        updateContact: () => {},
      }}
    >
      <ContactList />
    </ContactDbContext.Provider>
  );

  const fooEditButton = screen.getByTestId(`edit-${contacts[0].id}`);
  expect(fooEditButton).toHaveAttribute("href", `/edit/${contacts[0].id}`);
});

test("opens the delete dialog when clicking on delete", () => {
  const contacts: Contact[] = [
    { id: "foo", name: "foo", phoneNumber: "+491234567" },
    { id: "bar", name: "bar", phoneNumber: "+492345678" },
    { id: "bazz", name: "bazz", phoneNumber: "+493456789" },
  ];

  render(
    <ContactDbContext.Provider
      value={{
        contacts,
        addContact: () => {},
        removeContact: () => {},
        updateContact: () => {},
      }}
    >
      <ContactList />
    </ContactDbContext.Provider>
  );

  const fooDeleteButton = screen.getByTestId(`delete-${contacts[0].id}`);
  fooDeleteButton.click();

  const dialogTitle = screen.getByText(/are you sure\?/i);
  expect(dialogTitle).toBeInTheDocument();
});
