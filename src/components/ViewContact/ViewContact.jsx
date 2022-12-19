import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { contactContext } from '../../context/contactContext';
import { getContact, getGroup } from '../../services/contactServices';
import Spinner from '../Spinner/Spinner';

const ViewContact = () => {
  const { contactId } = useParams();
  const [state, setState] = useState({
    contact: {},
    group: {},
  });
  const { loading, setLoading } = useContext(contactContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        const { data: groupData } = await getGroup(contactData.group);
        console.log(contactData);
        setLoading(false);
        setState({
          ...state,
          loading: false,
          contact: contactData,
          group: groupData,
        });
        //Give our page time to load
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { contact, group } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && (
            <section className='p-3'>
              <div className='container'>
                <h4 className='text-success text-center border-bottom border-info pb-3'>
                  Contact Information
                </h4>
                <div className='row pt-2'>
                  <div className='col'>
                    <div className='card my-2 bg__card'>
                      <div className='card-body'>
                        <div className='row align-items-center justify-content-around'>
                          <div className='col-12 col-md-4'>
                            <img
                              src={contact.photo}
                              className='img-fluid rounded mb-2'
                              alt={contact.name}
                            />
                          </div>
                          <div className='col-12 col-md-8'>
                            <ul className='list-group'>
                              <li className='list-group-item list-group-item-dark'>
                                FirstName And LastName:{' '}
                                <span className='fw-bold'>{contact.name}</span>
                              </li>
                              <li className='list-group-item list-group-item-dark'>
                                PhoneNumber:{' '}
                                <span className='fw-bold'>
                                  {contact.mobile}
                                </span>
                              </li>
                              <li className='list-group-item list-group-item-dark'>
                                E-mail:{' '}
                                <span className='fw-bold'>{contact.email}</span>
                              </li>
                              <li className='list-group-item list-group-item-dark'>
                                Jobs:{' '}
                                <span className='fw-bold'>{contact.job}</span>
                              </li>
                              <li className='list-group-item list-group-item-dark'>
                                Groups:{' '}
                                <span className='fw-bold'>{group.name}</span>
                              </li>
                            </ul>
                          </div>
                          <Link
                            to={'/contacts'}
                            className='btn btn-outline-primary mt-2'
                          >
                            Return to main page
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ViewContact;
