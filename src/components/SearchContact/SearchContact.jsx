import React, { useContext } from 'react';
import { contactContext } from '../../context/contactContext';
import { Nav, Form } from 'react-bootstrap';

const SearchContact = () => {
  const { searchContact } = useContext(contactContext);
  return (
    <Nav className='navbar-nav ms-auto mb-2 mb-lg-0'>
      <form className='d-flex mx-2 ml-auto w-100'>
        <Form.Control
          onChange={(e) => searchContact(e.target.value)}
          placeholder='Search...'
        />
      </form>
    </Nav>
  );
};

export default SearchContact;
