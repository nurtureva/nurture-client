import { useLoaderData } from 'react-router-dom';
import { CheckboxOptionGroup } from '../components/CheckboxOptionGroup';
import { InputObject, Option } from '@/types';
import { PhotoInput } from '../components/PhotoInput';

const useFormInputList = () => {
  const appointmentOptions = [
    { id: 1, name: 'Online/Telehealth' },
    { id: 2, name: 'Home Visits' }
  ];

  const { services, paymentOptions, certifications } = useLoaderData() as {
    services: Option[];
    paymentOptions: Option[];
    certifications: Option[];
  };
  const formContent: InputObject[] = [
    {
      name: 'Name',
      dbName: 'name',
      description: 'First & Last',
      size: 'small',
      stubName: 'Basic Details'
    },
    {
      name: 'Business Name',
      size: 'small',
      dbName: 'business_name',
      stubName: 'Basic Details'
    },
    {
      name: 'Email',
      dbName: 'email',
      description: 'example@example.com',
      stubName: 'Basic Details'
    },
    {
      name: 'Phone',
      dbName: 'phone',
      description: '(xxx) xxx-xxxx',
      stubName: 'Basic Details'
    },
    {
      name: 'Profile photo',
      Element: PhotoInput,
      props: {
        dbName: 'profile_photo'
      },
      description:
        'A square photo or a photo with your face centered works best (.jpg, max file size ___)',
      stubName: 'Basic Details'
    },
    {
      name: 'Website',
      dbName: 'website',
      description: 'www.example.com',
      stubName: 'Contact'
    },
    {
      name: 'Address 1',
      dbName: 'address_1',
      description: '1234 example street',
      stubName: 'Contact'
    },
    {
      name: 'Address 2',
      dbName: 'address_2',
      description: 'apartment, floor, suite',
      stubName: 'Contact'
    },
    { name: 'City', dbName: 'city', stubName: 'Contact' },
    { name: 'State', dbName: 'state', stubName: 'Contact' },
    {
      name: 'Languages spoken',
      dbName: 'languages_spoken',
      stubName: 'About'
    },
    {
      name: 'Pronouns',
      dbName: 'pronouns',
      description: 'she/her, they/them',
      stubName: 'About'
    },
    {
      name: 'Services',
      Element: CheckboxOptionGroup,
      props: {
        formKey: 'services',
        optionsArray: services
      },
      description: 'Select all that apply',
      stubName: 'Basic Details'
    },
    {
      name: 'Payment Options',
      Element: CheckboxOptionGroup,
      props: {
        formKey: 'paymentOptions',
        optionsArray: paymentOptions
      },
      description: 'Select all that apply',
      stubName: 'Professional Details'
    },
    {
      name: 'Certifications',
      Element: CheckboxOptionGroup,
      props: {
        formKey: 'certifications',
        optionsArray: certifications
      },
      description: 'Select all that apply',
      stubName: 'Professional Details'
    },
    {
      name: 'Appointment Options',
      Element: CheckboxOptionGroup,
      props: {
        formKey: 'appointmentOptions',
        optionsArray: appointmentOptions
      },
      description: 'Select all that apply',
      stubName: 'Professional Details'
    },
    {
      name: 'Overview',
      dbName: 'overview',
      props: { element: 'textarea' },
      stubName: 'About'
    },
    {
      name: 'Bio',
      dbName: 'bio',
      props: { element: 'textarea' },
      stubName: 'About'
    }
  ];
  return formContent;
};

export { useFormInputList };
