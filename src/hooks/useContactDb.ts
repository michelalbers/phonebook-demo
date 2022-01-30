import { createContext, useMemo, useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

export type Contact = {
  id: string;
  name: string;
  phoneNumber: string;
};

export const LOCAL_STORAGE_KEY = "contacts-db-3000";

export const useContactDb = () => {
  const initialDbState = useMemo(() => window.localStorage.getItem(LOCAL_STORAGE_KEY), []);
  const [contacts, setContacts] = useState<Contact[]>(
    initialDbState ? JSON.parse(initialDbState) : []
  );

  const addContact = useCallback((contact: Omit<Contact, "id">) => {
    setContacts((cs) => [...cs, { id: v4(), ...contact }]);
  }, []);

  const updateContact = useCallback(
    (id: Contact["id"], values: Omit<Contact, "id">) => {
      const contactToUpdateIdx = contacts.findIndex(
        (contact) => contact.id === id
      );

      const contactsCopy = [...contacts];

      contactsCopy[contactToUpdateIdx] = {
        id,
        name: values.name,
        phoneNumber: values.phoneNumber,
      };

      setContacts(contactsCopy);
    },
    [contacts]
  );

  const removeContact = useCallback((id: string) => {
    setContacts((contacts) => contacts.filter((c) => c.id !== id));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return {
    contacts,
    addContact,
    removeContact,
    updateContact,
  };
};

export const ContactDbContext = createContext<ReturnType<typeof useContactDb>>({
  contacts: [],
  addContact: () => {
    throw new Error("Provide implementation for addContact");
  },
  removeContact: () => {
    throw new Error("Provide implementation for removeContact");
  },
  updateContact: () => {
    throw new Error("Provide implementation for updateContact");
  },
});
