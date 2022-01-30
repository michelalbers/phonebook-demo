import { act, renderHook } from '@testing-library/react-hooks';
import { LOCAL_STORAGE_KEY, useContactDb } from "./useContactDb"

test("should read contactsDb from local storage", () => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([
    { id: 'foo', name: 'foo', phoneNumber: '+4912345678' }
  ])) 

  const { result: { current: contactDb } } = renderHook(() => useContactDb());

  expect(contactDb.contacts).toHaveLength(1);
});

test("should update local storage when adding a contact", () => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([
    { id: 'foo', name: 'foo', phoneNumber: '+4912345678' }
  ])) 

  const { result: { current: contactDb } } = renderHook(() => useContactDb());

  act(() => contactDb.addContact({ name: 'Test Contact', phoneNumber: '+49123457890' }));

  const updatedStore = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  expect(JSON.parse(updatedStore as string)).toHaveLength(2)
});

// TODO: add tests for id generation, removing and updating contacts