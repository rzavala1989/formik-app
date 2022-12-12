import { createContext } from 'react';

export const contactContext = createContext({
  contacts: [],
  setLoading: () => {},
  contact: {},
  setContacts: () => {},
  setFilteredContacts: () => {},
  filteredContacts: [],
  groups: [],
  contactQuery: {},
  onContactChange: () => {},
  deleteContact: () => {},
  createContact: () => {},
  searchContact: () => {},
});
