import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { NewContactPage } from "./NewContact";

test("should render without errors and match snapshot", () => {
  const tree = render(
    <BrowserRouter>
      <NewContactPage />
    </BrowserRouter>
  );
  expect(tree).toMatchSnapshot();
});
