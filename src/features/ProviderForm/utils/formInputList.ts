import { useLoaderData } from 'react-router-dom';
import { CheckboxOptionGroup } from '../components/CheckboxOptionGroup';
import { FormType, InputObject, Option, PageStateTitle } from '@/types';
import individualList from './individualInputList.json';
import organizationList from './organizationInputList.json';
import { PhotoInput } from '../components/PhotoInput';
import { FormFields } from './formContext';

const useFormInputList: (
  formType: FormType
) => [FormFields, PageStateTitle[], string] = (formType) => {
  const appointmentOptions = [
    { id: 1, name: 'Online/Telehealth' },
    { id: 2, name: 'Home Visits' }
  ];

  const ethnicity = [
    {
      id: 1,
      name: 'American Indian, Native, First Nations, Indigenous Peoples of the Americas, or Alaska Native'
    },
    { id: 2, name: 'Asian or Asian-American' },
    { id: 3, name: 'Black or African-American' },
    { id: 4, name: 'Hispanic, Latino/a, Spanish' },
    { id: 5, name: 'Middle Eastern or North African' },
    { id: 6, name: 'Native Hawaiian or Pacific Islander' },
    { id: 7, name: 'White' },
    { id: 8, name: 'Not listed (please specify)' },
    { id: 9, name: 'Don’t know' },
    { id: 10, name: 'Prefer not to answer' }
  ];
  const gender = [
    { id: 1, name: 'Female' },
    { id: 2, name: 'Male' },
    { id: 3, name: 'Transgender' },
    { id: 4, name: 'Cisgender' },
    { id: 5, name: 'Genderqueer or gender nonconforming' },
    { id: 6, name: 'Prefer to self-describe (Please tell us)' },
    { id: 7, name: 'Prefer not to say' }
  ];
  const { services, paymentOptions, certifications } = useLoaderData() as {
    services: Option[];
    paymentOptions: Option[];
    certifications: Option[];
  };
  const options = {
    services,
    paymentOptions,
    certifications,
    appointmentOptions,
    ethnicity,
    gender
  };

  const title =
    formType === 'individual'
      ? 'Add your practice to the Directory'
      : 'Add your organization to the Directory';

  const formFields = (
    formType === 'individual' ? individualList : organizationList
  )['input'];
  console.log(formFields);

  formFields.forEach((input) => {
    if (input.Element === 'CHECKBOX') {
      input.Element = CheckboxOptionGroup;
      input.props.optionsArray = options[input.props.formKey];
    } else if (input.Element === 'PHOTO') {
      input.Element = PhotoInput;
    }
  });

  const distinctPageTitles = new Set<string>();

  // Iterate through the array to collect distinct values
  formFields.forEach((input) => {
    distinctPageTitles.add(input.stubName);
  });

  // Convert the Set to an array if needed
  const pageStateTitles = Array.from(distinctPageTitles);

  return [formFields, pageStateTitles, title];
};

export { useFormInputList };
