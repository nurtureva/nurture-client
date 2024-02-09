import { useLoaderData } from 'react-router-dom';
import {
  FormFields,
  FormItem,
  FormType,
  Option,
  PageStateTitle,
  SelectorProps
} from '@/types';
import individualJsonList from './individualInputList.json';
const individualList = individualJsonList as FormFields;
import organizationJsonList from './organizationInputList.json';
const organizationList = organizationJsonList as FormFields;
import { PhotoInput } from '../components/PhotoInput';
import { FormInput } from '../components/FormInput';
import { FormSelector } from '../components/FormSelector';

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

  const pageTitle =
    formType === 'individual'
      ? 'Add your practice to the Directory'
      : 'Add your organization to the Directory';

  const formFields =
    formType === 'individual' ? individualList : organizationList;

  const pageStateTitles = Object.keys(formFields) as PageStateTitle[];

  //assign appropriate elements to each form item based on ENUM from JSON
  pageStateTitles.forEach((formTitle) => {
    formFields[formTitle].forEach((formField) => {
      if (formField.Element === 'SELECTOR') {
        formField.Element = FormSelector;
        //@ts-ignore typescript isn't implicitly asserting that props is SelectorProps. Need to look to see if FormItem type uses fallbacks correctly.
        formField.props.optionsArray = options[formField.props.dbName];
      } else if (formField.Element === 'PHOTO') {
        formField.Element = PhotoInput;
      } else if (formField.Element === 'INPUT') {
        formField.Element = FormInput;
      }
    });
  });

  return [formFields, pageStateTitles, pageTitle];
};

export { useFormInputList };
