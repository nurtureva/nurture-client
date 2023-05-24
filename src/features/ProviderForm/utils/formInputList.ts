import { useLoaderData } from 'react-router-dom';
import CheckboxOptionGroup, {
  CheckboxPropsObject
} from '../components/CheckboxOptionGroup';
import { Option } from '../../Provider/types';

export interface BaseInputObject {
  name: string;
  description?: string;
}

export interface GenericInputObject extends BaseInputObject {
  dbName: string;
  props?: GenericInputProps;
}

export interface CustomInputObject extends BaseInputObject {
  Element: React.FC<CheckboxPropsObject>;
  props: CustomInputProps;
}

export type InputObject = GenericInputObject | CustomInputObject;

export interface CustomInputProps {
  formKey: string;
  optionsArray: Option[];
}

export interface GenericInputProps {
  element: string;
  type?: string;
}

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
    { name: 'Name', dbName: 'name', description: 'First & Last' },
    {
      name: 'Business Name',
      dbName: 'business_name'
    },
    { name: 'Email', dbName: 'email', description: 'example@example.com' },
    { name: 'Phone', dbName: 'phone', description: '(xxx) xxx-xxxx' },
    { name: 'Website', dbName: 'website', description: 'www.example.com' },
    {
      name: 'Address 1',
      dbName: 'address_1',
      description: '1234 example street'
    },
    {
      name: 'Address 2',
      dbName: 'address_2',
      description: 'apartment, floor, suite'
    },
    { name: 'City', dbName: 'city' },
    { name: 'State', dbName: 'state' },
    { name: 'Languages spoken', dbName: 'languages_spoken' },
    { name: 'Pronouns', dbName: 'pronouns', description: 'she/her, they/them' },
    {
      name: 'Services',
      Element: CheckboxOptionGroup,
      props: {
        formKey: 'services',
        optionsArray: services
      },
      description: 'Select all that apply'
    },
    {
      name: 'Payment Options',
      Element: CheckboxOptionGroup,
      props: {
        formKey: 'paymentOptions',
        optionsArray: paymentOptions
      },
      description: 'Select all that apply'
    },
    {
      name: 'Certifications',
      Element: CheckboxOptionGroup,
      props: {
        formKey: 'certifications',
        optionsArray: certifications
      },
      description: 'Select all that apply'
    },
    {
      name: 'Appointment Options',
      Element: CheckboxOptionGroup,
      props: {
        formKey: 'appointmentOptions',
        optionsArray: appointmentOptions
      },
      description: 'Select all that apply'
    },
    {
      name: 'Overview',
      dbName: 'overview',
      props: { element: 'textarea' }
    },
    {
      name: 'Bio',
      dbName: 'bio',
      props: { element: 'textarea' }
    },
    {
      name: 'Profile Photo',
      dbName: 'profile_photo',
      props: { type: 'file', element: 'input' }
    },
    {
      name: 'Logo',
      dbName: 'logo',
      props: { type: 'file', element: 'input' }
    }
  ];
  return formContent;
};

export { useFormInputList };
