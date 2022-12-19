import axios from 'axios';

const SERVER_URL = 'http://localhost:5000';

// Get all contacts
// http:/localhost:5000/contacts

export const getAllContacts = () => {
  return axios.get(`${SERVER_URL}/contacts`);
};

// Get single contact with contactId
// http:/localhost:5000/contacts/:contactId

export const getContact = (contactId) => {
  return axios.get(`${SERVER_URL}/contacts/${contactId}`);
};

// Get all groups
// http:/localhost:5000/groups

export const getAllGroups = () => {
  return axios.get(`${SERVER_URL}/groups`);
};

// Get single groups with groupId
// http:/localhost:5000/groups/:groupId

export const getGroup = (groupId) => {
  return axios.get(`${SERVER_URL}/groups/${groupId}`);
};

// Create New Contact
// POST
// http:/localhost:5000/contacts
export const createContact = (contact) => {
  return axios.post(`${SERVER_URL}/contacts`, contact);
};

// Edit a Contact
// PUT
// http:/localhost:5000/contacts/:contactId
export const updateContact = (contact, contactId) => {
  return axios.put(`${SERVER_URL}/contacts/${contactId}`, contact);
};

// Delete Contact
// DELETE
// http:/localhost:5000/contacts/:contactId
export const deleteContact = (contactId) => {
  return axios.delete(`${SERVER_URL}/contacts/${contactId}`);
};
