import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ContactEditorPage } from "./ContactEditor";

test("should render without errors and match snapshot", () => {
  const tree = render(
    <BrowserRouter>
      <ContactEditorPage />
    </BrowserRouter>
  );
  expect(tree).toMatchSnapshot();
});
