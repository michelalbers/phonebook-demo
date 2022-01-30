import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContactForm } from "../components/ContactForm";
import { ContactDbContext } from "../hooks/useContactDb";

export const ContactEditorPage: React.FC<{}> = (props) => {
  const contactsDb = React.useContext(ContactDbContext);
  const navigate = useNavigate();
  const params = useParams();

  const onEditContact = React.useCallback(
    (values) => {
      contactsDb.updateContact(params.id as string, values);
      navigate("/");
    },
    [contactsDb, navigate, params]
  );

  const contactToEdit = React.useMemo(
    () => contactsDb.contacts.find((contact) => contact.id === params.id),
    [contactsDb, params]
  );

  return <ContactForm contact={contactToEdit} onSave={onEditContact} />;
};
