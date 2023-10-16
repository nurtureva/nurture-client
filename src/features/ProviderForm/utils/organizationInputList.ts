import { InputObject, Option } from '@/types';
import { CheckboxOptionGroup } from '../components/CheckboxOptionGroup';
import { PhotoInput } from '../components/PhotoInput';
import { useLoaderData } from 'react-router-dom';

export const useOrganizationInputList = () => {
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
      name: 'Organization Name',
      dbName: 'name',
      stubName: 'Basic Details'
      // rules: { required: true }
    },
    {
      name: 'Email',
      dbName: 'email',
      description: 'example@example.com',
      stubName: 'Basic Details',
      size: 'large'
    },
    {
      name: 'Phone',
      dbName: 'phone',
      description: '(xxx) xxx-xxxx',
      stubName: 'Basic Details',
      size: 'small'
    },
    {
      name: 'Type of care provided',
      Element: CheckboxOptionGroup,
      props: {
        formKey: 'services',
        optionsArray: services
      },
      description: 'Select all that apply',
      stubName: 'Basic Details'
    },
    {
      name: 'Logo',
      Element: PhotoInput,
      props: {
        dbName: 'logo'
      },
      description:
        'A square or circular file works best (.jpg, max file size ___)',
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
      stubName: 'Contact',
      size: 'large'
    },
    {
      name: 'Address 2',
      dbName: 'address_2',
      description: 'apartment, floor, suite',
      stubName: 'Contact',
      size: 'small'
    },
    { name: 'City', dbName: 'city', stubName: 'Contact', size: 'small' },
    { name: 'State', dbName: 'state', stubName: 'Contact', size: 'small' },
    { name: 'Zip code', dbName: 'zip', stubName: 'Contact', size: 'small' },
    {
      name: 'Overview',
      dbName: 'overview',
      props: { element: 'textarea' },
      stubName: 'About'
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
      name: 'In practice since:',
      dbName: 'startingYear',
      description: 'Enter year',
      stubName: 'Professional details'
    }
  ];

  return formContent;
};
