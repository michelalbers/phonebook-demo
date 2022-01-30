import React from "react";
import { useNavigate } from "react-router-dom";
import { ContactForm } from "../components/ContactForm";
import { ContactDbContext } from "../hooks/useContactDb";

export const NewContactPage: React.FC<{}> = (props) => {
  const contactsDb = React.useContext(ContactDbContext);
  const navigate = useNavigate();

  const onSaveContact = React.useCallback(
    (values) => {
      contactsDb.addContact(values);
      navigate("/");
    },
    [contactsDb, navigate]
  );

  return <ContactForm onSave={onSaveContact} />;
};
