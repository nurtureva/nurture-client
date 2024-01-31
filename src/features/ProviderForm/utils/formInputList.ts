import { useLoaderData } from 'react-router-dom';
import { CheckboxOptionGroup } from '../components/CheckboxOptionGroup';
import { FormType, InputObject, Option, PageStateTitle } from '@/types';
import individualList from './individualInputList.json';
import organizationList from './organizationInputList.json';
import { PhotoInput } from '../components/PhotoInput';
import { FormFields } from './formContext';
import { Dropdown } from '../components/Dropdown';

const useFormInputList: (
  formType: FormType
) => [FormFields, PageStateTitle[], string] = (formType) => {
  const {
    services,
    paymentOptions,
    certifications,
    appointmentTypes,
    languages,
    gender,
    pronouns,
    ethnicity,
    organizationTypes
  } = useLoaderData() as {
    services: Option[];
    paymentOptions: Option[];
    certifications: Option[];
    appointmentTypes: Option[];
    languages: Option[];
    gender: Option[];
    pronouns: Option[];
    ethnicity: Option[];
    organizationTypes: Option[];
  };
  const options = {
    services,
    paymentOptions,
    certifications,
    appointmentTypes,
    languages,
    gender,
    pronouns,
    ethnicity,
    organizationTypes
  };

  const title =
    formType === 'individual'
      ? 'Add your practice to the Directory'
      : 'Add your organization to the Directory';

  const formFields = (
    formType === 'individual' ? individualList : organizationList
  )['input'];

  formFields.forEach((input) => {
    if (input.Element === 'CHECKBOX') {
      input.Element = CheckboxOptionGroup;
      input.props.optionsArray = options[input.props.formKey];
    } else if (input.Element === 'DROPDOWN') {
      input.Element = Dropdown;
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
