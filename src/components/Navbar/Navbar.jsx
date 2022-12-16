import React, { useState } from 'react';
import SearchContact from '../SearchContact/SearchContact';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container } from 'react-bootstrap';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <header>
      <BootstrapNavbar
        className='d-flex justify-content-between'
        variant='dark'
        bg='dark'
        expand='lg'
      >
        <Container>
          <Link
            to='/contacts'
            className='navbar-brand text-center text-white d-flex align-items-center mt-2'
          >
            <BootstrapNavbar.Brand>
              <i className='fa fa-address-book text-warning mx-2'></i> Manage
              Contacts
            </BootstrapNavbar.Brand>
          </Link>
          <BootstrapNavbar.Toggle aria-controls='basic-navbar-nav' />
          <BootstrapNavbar.Collapse id='basic-navbar-nav' onClick={handleNav}>
            {location.pathname === '/contacts' ? <SearchContact /> : null}
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </header>
  );
};

export default Navbar;
