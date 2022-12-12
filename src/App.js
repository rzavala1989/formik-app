import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import {
  Contacts,
  Navbar,
  AddContact,
  EditContact,
  ViewContact,
} from './components';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import _ from 'lodash';
import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from './services/contactServices';
import { contactContext } from './context/contactContext';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({});
  const [filteredContacts, setFilteredContacts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupData } = await getAllGroups();
        setContacts(contactsData);
        setGroups(groupData);
        setFilteredContacts(contactsData);
        //Give our page time to load
        setTimeout(() => {
          setLoading(false);
        }, 250);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const createContactForm = async (values) => {
    try {
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createContact(values);

      if (status === (200 || 201)) {
        toast.success('Successfully created a contact!');
        // reinitialize contact data
        const allContacts = [...contacts, data];
        setContacts(allContacts);
        setFilteredContacts(allContacts);
        setLoading((prevLoading) => !prevLoading);
        navigate('/contacts');
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const onContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const removeContact = async (contactId) => {
    // creating a snapshot of previous state
    const allContacts = [...contacts];
    try {
      const updateContact = contact.filter((item) => item.id !== contactId);
      setContacts(updateContact);
      setFilteredContacts(updateContact);

      //send req to server
      const { status } = await deleteContact(contactId);
      toast.error('Contact deleted!');

      if (status !== 200) {
        // do nothing
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const deleteConfirmation = (contactId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This operation can't be reversed!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete!',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result);
        removeContact(contactId);
        Swal.fire(
          'Delete run successfully!',
          'You have purged this contact from your life...',
          'success'
        );
      }
    });
  };
  const searchContact = _.debounce((query) => {
    if (!query) return setFilteredContacts([...contacts]);
    setFilteredContacts(
      contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 1000);
  //TODO: Manage to build in a typeahead

  return (
    <contactContext.Provider
      value={{
        contacts,
        loading,
        setLoading,
        contact,
        setContacts,
        setFilteredContacts,
        filteredContacts,
        groups,
        onContactChange,
        deleteContact: deleteConfirmation,
        createContact: createContactForm,
        searchContact,
      }}
    >
      <ToastContainer theme='colored' />
      <Routes>
        <Route path='/' element={<Navigate to='/contacts' />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/contacts/add' element={<AddContact />} />
        <Route path='/contacts/:contactId' element={<ViewContact />} />
        <Route path='/contacts/edit/:contactId' element={<EditContact />} />
      </Routes>
    </contactContext.Provider>
  );
}

export default App;
