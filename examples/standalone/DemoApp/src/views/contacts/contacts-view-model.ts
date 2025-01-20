import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/store';
import {
  selectContacts,
  addContact,
  updateContact,
  removeContact,
  fetchContacts,
  selectContactsStatus,
  selectErrorMessage,
  selectCurrentContact,
  updateCurrentContact,
} from './contact-slice';
import { ContactInterface } from '../../models';

/**
 * Custom hook for interactions between the view and state.
 * @returns
 */
export const useContactViewModel = () => {
  const dispatch = useAppDispatch();
  const contactsSelector = useAppSelector(selectContacts);
  const [contacts, setContacts] =
    useState<ContactInterface[]>(contactsSelector);
  const [status] = useState(useAppSelector(selectContactsStatus));
  const [errorMessage] = useState(useAppSelector(selectErrorMessage));

  /**
   * Fetches initial contacts.
   *
   * @param capacity {number} Number of contacts to load.
   */
  const fetchData = (capacity: number) => {
    useEffect(() => {
      dispatch(fetchContacts(capacity));
    }, []);

    useEffect(() => {
      setContacts(contactsSelector);
    }, [contactsSelector, selectContacts]);
  };

  /**
   * Loads more contacts.
   * @param capacity {number} Number of contacts to load.
   */
  const loadMore = (capacity: number) => {
    dispatch(fetchContacts(capacity));
  };

  /**
   * Saves a new contact.
   * @param contact
   */
  const saveContact = (contact: Omit<ContactInterface, 'id'>) => {
    dispatch(addContact(contact));
  };

  /**
   * Removes a contact.
   * @param contact
   */
  const deleteContact = (contact: ContactInterface) => {
    dispatch(removeContact(contact));
  };

  /**
   * Updates an existing contact.
   * @param contact
   */
  const updateContactInfo = (contact: ContactInterface) => {
    dispatch(updateContact(contact));
  };

  /**
   * Called to set the currently selected contact.
   * @param contact
   */
  const setCurrentContact = (contact: ContactInterface | undefined) => {
    dispatch(updateCurrentContact(contact));
  };

  /**
   * Gets the currently selected contact from memory.
   * @returns
   */
  const getCurrentContact = (): ContactInterface | undefined => {
    return useAppSelector(selectCurrentContact);
  };

  return {
    contacts,
    deleteContact,
    errorMessage,
    fetchData,
    getCurrentContact,
    loadMore,
    saveContact,
    setCurrentContact,
    status,
    updateContactInfo,
  };
};
