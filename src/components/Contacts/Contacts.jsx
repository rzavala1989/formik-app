import React, { useContext } from 'react';
import Contact from '../Contact/Contact';
import ContactNotFound from '../ContactNotFound/ContactNotFound';
import { Link } from 'react-router-dom';
import { contactContext } from '../../context/contactContext';
import Spinner from '../Spinner/Spinner';

const Contacts = () => {
  const { filteredContacts, deleteContact, loading } =
    useContext(contactContext);
  return (
    <>
      <section className='container'>
        <div className='row'>
          <div className='col col-md-6 p-4'>
            <Link to='/contacts/add' className='style.btn btn__purple'>
              Create Contact<i className='fa fa-plus-circle mx-2'></i>
            </Link>
          </div>
        </div>
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <div className='container'>
            <div className='row'>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <Contact
                    key={contact.id}
                    deleteContact={() => deleteContact(contact.id)}
                    contact={contact}
                  />
                ))
              ) : (
                <ContactNotFound />
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Contacts;
