import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { contactContext } from '../../context/contactContext';
import { Formik, Field, ErrorMessage } from 'formik';
import { Container, Row, Form } from 'react-bootstrap';
import { contactSchema } from '../../validations/contactValidation';
import FormikForm from './FormikForm/FormikForm';
import Spinner from '../Spinner/Spinner';

const AddContact = () => {
  const { addContact, loading } = useContext(contactContext);

  const handleSubmit = (e, values) => {
    e.preventDefault();
    addContact(values);
  };

  return (
    <>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <section className='p-3'>
          <Container>
            <h3 className='text-success textcenter border-bottom border-info pb-3'>
              Create a new contact
            </h3>
            <Row className='pt-2'>
              <div className='col-12 col-lg-6'>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    photo: '',
                    mobile: '',
                    group: '',
                    job: '',
                    website: '',
                  }}
                  validateOnChange={true}
                  validateOnBlur={true}
                  validationSchema={contactSchema}
                  onSubmit={(values, actions) => {
                    handleSubmit(values);
                    actions.resetForm();
                    actions.setSubmitting(false);
                  }}
                >
                  <FormikForm />
                </Formik>
              </div>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default AddContact;
