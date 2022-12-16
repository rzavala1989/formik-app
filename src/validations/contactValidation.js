import * as Yup from 'yup';

export const contactSchema = Yup.object({
  name: Yup.string().required('A contact must required a name'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  group: Yup.string().required('Group selection is required'),
  mobile: Yup.number().required('Phone number is required'),
  website: Yup.string().url(),
});
