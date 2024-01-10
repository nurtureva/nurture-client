import {
  FormProvider,
  FormType,
  InputObject,
  PageStateTitle,
  ProviderObject
} from '@/types';
import { Context, createContext, useContext, useEffect, useState } from 'react';
import {
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm
} from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import { useFormInputList } from './formInputList';
import { useDefaultValues } from './helpers';

const FormContext = createContext({} as FormContextObject);

export const useFormContext = () => useContext(FormContext);

export const useContextInitializer: ContextInitializer = (formType) => {
  const [formFields, pageStateTitles, formTitle] = useFormInputList(formType);
  const { provider } = useLoaderData() as {
    provider: ProviderObject;
  };
  const defaultProvider = useDefaultValues();
  //this should be updated for demographics
  const { register, handleSubmit, getValues } = useForm<FormProvider>({
    defaultValues: defaultProvider
  });
  const [state, setState] = useState<StateObject>({
    initialProvider: provider,
    newProvider: undefined,
    pictures: {},
    error: undefined,
    submissionResponse: undefined,
    pageState: 1,
    canProceed: true
  });

  const updateState = (newState: Partial<StateObject>) => {
    setState((previousState) => ({ ...previousState, ...newState }));
  };

  const back = () => {
    if (state.pageState < 2) return;
    updateState({ pageState: state.pageState - 1 });
  };

  const next = () => {
    if (state.pageState > pageStateTitles.length) return;
    updateState({ pageState: state.pageState + 1 });
  };

  const {
    initialProvider,
    newProvider,
    pictures,
    pageState,
    canProceed,
    submissionResponse,
    error
  } = state;

  const value: FormContextObject = {
    formData: {
      initialProvider,
      newProvider,
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
      canProceed,
      next,
      back,
      updateState
    },
    formFunctions: {
      register,
      getValues,
      handleSubmit
    },
    submissionResponse,
    error
  };
  return [FormContext, value];
};

export type Pictures = {
  profile_photo?: File;
  logo?: File;
};

interface StateObject {
  newProvider?: FormProvider;
  error?: any;
  submissionResponse?: any;
  initialProvider: ProviderObject | FormProvider;
  pictures: Pictures;
  pageState: number;
  canProceed: boolean;
}
type UpdateStateFn = (props: {
  newProvider?: FormProvider;
  error?: any;
  submissionResponse?: any;
  initialProvider?: ProviderObject | FormProvider;
  pictures?: Pictures;
  pageState?: number;
  canProceed?: boolean;
}) => void;

interface FormContextObject {
  formData: {
    initialProvider?: ProviderObject | FormProvider;
    newProvider?: FormProvider;
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
    canProceed: boolean;
    next: () => void;
    back: () => void;
    updateState: UpdateStateFn;
  };
  formFunctions: {
    register: UseFormRegister<FormProvider>;
    getValues: UseFormGetValues<FormProvider>;
    handleSubmit: UseFormHandleSubmit<FormProvider>;
  };
  error: any;
  submissionResponse: any;
}

export type FormFields = { [key in Partial<PageStateTitle>]: InputObject[] };

type ContextInitializer = (
  formType: FormType
) => [Context<FormContextObject>, FormContextObject];
