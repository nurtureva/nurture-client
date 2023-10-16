import { useLoaderData } from 'react-router-dom';
import { CheckboxOptionGroup } from '../components/CheckboxOptionGroup';
import { FormType, InputObject, Option, PageStateTitle } from '@/types';
import individualList from './individualInputList.json';
import organizationList from './organizationInputList.json';
import { PhotoInput } from '../components/PhotoInput';

const useFormInputList: (
  formType: FormType
) => [InputObject[], PageStateTitle[], string] = (formType) => {
  const appointmentOptions = [
    { id: 1, name: 'Online/Telehealth' },
    { id: 2, name: 'Home Visits' }
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
    appointmentOptions
  };

  const title =
    formType === 'individual'
      ? 'Add your practice to the Directory'
      : 'Add your organization to the Directory';

  const inputList = (
    formType === 'individual' ? individualList : organizationList
  )['input'];
  inputList.forEach((input) => {
    if (input.Element === 'CHECKBOX') {
      input.Element = CheckboxOptionGroup;
      input.props.optionsArray = options[input.props.formKey];
    } else if (input.Element === 'PHOTO') {
      input.Element = PhotoInput;
    }
  });

  const distinctPageTitles = new Set<string>();

  // Iterate through the array to collect distinct values
  inputList.forEach((input) => {
    distinctPageTitles.add(input.stubName);
  });

  // Convert the Set to an array if needed
  const pageStateTitles = Array.from(distinctPageTitles);

  return [inputList, pageStateTitles, title];
};

export { useFormInputList };
