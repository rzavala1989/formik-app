import React, { useContext } from 'react';
import { contactContext } from '../../../context/contactContext';
import { useFormikContext, Field, ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FormikForm = () => {
  const { groups } = useContext(contactContext);
  const { errors } = useFormikContext();
  return (
    <>
      <form autoComplete='off'>
        <Form.Group className='mb-3'>
          <Form.Label className='text-white'>Name</Form.Label>
          <Field as={Form.Control} name='name' isInvalid={!!errors?.name} />
          <ErrorMessage
            name='name'
            render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='text-white'>Photo</Form.Label>
          <Field as={Form.Control} name='photo' isInvalid={!!errors?.photo} />
          <ErrorMessage
            name='photo'
            render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='text-white'>Email</Form.Label>
          <Field as={Form.Control} name='email' isInvalid={!!errors?.email} />
          <ErrorMessage
            name='email'
            render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='text-white'>Phone</Form.Label>
          <Field as={Form.Control} name='mobile' isInvalid={!!errors?.mobile} />
          <ErrorMessage
            name='mobile'
            render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='text-white'>Group</Form.Label>
          <Field as={Form.Select} name='group' isInvalid={!!errors?.group}>
            <option value='' className='text-white'>
              Select Groups
            </option>
            {groups.length > 0 &&
              groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
          </Field>
          <ErrorMessage
            name='group'
            render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='text-white'>Website</Form.Label>
          <Field
            as={Form.Control}
            name='website'
            isInvalid={!!errors?.website}
          />
          <ErrorMessage
            name='website'
            render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='text-white'>Job</Form.Label>
          <Field as={Form.Control} name='job' isInvalid={!!errors?.job} />
          <ErrorMessage
            name='job'
            render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
          />
        </Form.Group>
        <div className='mt-1'>
          <button type='submit' className='btn btn-outline-success me-2'>
            Create Contact
          </button>
          <Link
            to={'/contacts'}
            type='submit'
            className='btn btn-outline-danger'
          >
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
};

export default FormikForm;
