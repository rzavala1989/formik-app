import * as Yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const contactSchema = Yup.object({
  name: Yup.string().required('A contact must required a name'),
  photo: Yup.string().url('Must be a valid link'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  group: Yup.string().required('Group selection is required'),
  mobile: Yup.string()
    .required('Phone number is required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(10, 'too long'),
  website: Yup.string().url(),
});
