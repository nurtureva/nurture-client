import {
  FormFields,
  FormProvider,
  FormType,
  PageStateTitle,
  ProviderObject
} from '@/types';
import { Context, createContext, useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useFormInputList } from './formInputList';
import { useDefaultValues } from './helpers';

const FormContext = createContext({} as FormContextObject);

export const useFormContext = () => useContext(FormContext);

export const useContextInitializer: ContextInitializer = (formType) => {
  const navigate = useNavigate();
  const [formFields, pageStateTitles, formTitle] = useFormInputList(formType);
  const { provider: initialProvider, ...providerOptions } = useLoaderData();

  const defaultProvider = useDefaultValues(initialProvider);

  const [state, setState] = useState<StateObject>({
    newProvider: defaultProvider,
    pictures: {},
    submissionResponse: { message: '', id: undefined },
    pageState: 1
  });
  const updateState = (newState: Partial<StateObject>) => {
    setState((previousState) => ({ ...previousState, ...newState }));
  };

  const getFormValues = () => {
    const { general, ...otherStuff } = newProvider;
    const providerList = { ...general, ...otherStuff };
    return Object.keys(formFields)
      .flatMap((fieldName) => {
        return formFields[fieldName].map((field) => {
          const dbName = field.props.dbName;
          if (dbName && providerList[dbName]) {
            const userResponse =
              typeof providerList[dbName] !== 'string'
                ? providerOptions[dbName]
                    .filter((optionObject) =>
                      providerList[dbName].includes(optionObject.id.toString())
                    )
                    .map((optionObject) => optionObject.name)
                    .join(', ')
                : providerList[dbName];
            return [field.name, userResponse];
          }
        });
      })
      .filter((item) => item !== undefined);
  };

  const back = () => {
    if (state.pageState < 2) return navigate('/provider-form');
    updateState({ pageState: state.pageState - 1 });
  };

  const next = () => {
    if (state.pageState > pageStateTitles.length) return;
    updateState({ pageState: state.pageState + 1 });
  };

  const { newProvider, pictures, pageState, submissionResponse } = state;

  const value: FormContextObject = {
    formData: {
      newProvider,
      submissionResponse,
      pictures
    },
    formState: {
      formType: {
        type: formType,
        title: formTitle,
        formFields,
        pageStateTitles: [...pageStateTitles, 'Confirmation']
      },
      pageState,
      next,
      back,
      updateState,
      getFormValues
    }
  };
  return [FormContext, value];
};

export type Pictures = {
  profile_photo?: File;
  logo?: File;
};

interface StateObject {
  newProvider?: FormProvider;
  submissionResponse: { message?: string; id?: number };
  pictures: Pictures;
  pageState: number;
}
type UpdateStateFn = (props: {
  newProvider?: FormProvider;
  submissionResponse?: any;
  initialProvider?: ProviderObject | FormProvider;
  pictures?: Pictures;
  pageState?: number;
}) => void;

interface FormContextObject {
  formData: {
    newProvider?: FormProvider;
    submissionResponse: { message?: string; id?: number };
    pictures: Pictures;
  };
  formState: {
    formType: {
      type: FormType;
      title: string;
      formFields: FormFields;
      pageStateTitles: PageStateTitle[];
    };
    pageState: number;
    next: () => void;
    back: () => void;
    updateState: UpdateStateFn;
    getFormValues: Function;
  };
}

type ContextInitializer = (
  formType: FormType
) => [Context<FormContextObject>, FormContextObject];
