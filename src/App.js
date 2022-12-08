import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
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
import { getAllContacts } from './services/contactServices';

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
        setContacts(contactsData);
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

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/contacts' />} />
      <Route path='/contacts' element={<Contacts />} />
      <Route path='/contacts/add' element={<AddContact />} />
      <Route path='/contacts/:contactId' element={<ViewContact />} />
      <Route path='/contacts/edit/:contactId' element={<EditContact />} />
    </Routes>
  );
}

export default App;
