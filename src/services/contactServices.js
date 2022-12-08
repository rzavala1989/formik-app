import axios from 'axios';

const SERVER_URL = 'http://localhost:5000';

// Get all contacts
// http:/localhost:5000/contacts

export const getAllContacts = () => {
  return axios.get(`${SERVER_URL}/contacts`);
};
