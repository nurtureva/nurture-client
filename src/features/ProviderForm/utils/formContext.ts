import { FormProvider, PageStateTitle, ProviderObject } from '@/types';
import { Context, createContext, useContext, useEffect, useState } from 'react';
import { UseFormHandleSubmit, UseFormRegister, useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';

export type Pictures = {
  profile_photo?: File;
  logo?: File;
};

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
    pageState: number;
    pageStateTitles: PageStateTitle[];
    canProceed: boolean;
    next: () => void;
    back: () => void;
    updateState: UpdateStateFn;
  };
  formFunctions: {
    register: UseFormRegister<FormProvider>;
    handleSubmit: UseFormHandleSubmit<FormProvider>;
  };
  error: any;
  submissionResponse: any;
}

type ContextInitializer = () => [Context<FormContextObject>, FormContextObject];

const FormContext = createContext({} as FormContextObject);

export const useFormContext = () => useContext(FormContext);

export const useContextInitializer: ContextInitializer = () => {
  const { register, handleSubmit } = useForm<FormProvider>();

  const { provider } = useLoaderData() as {
    provider: ProviderObject;
  };
  const [initialProvider, setInitialProvider] = useState<
    FormProvider | ProviderObject
  >(provider);
  const [newProvider, setNewProvider] = useState<FormProvider>();
  const [pictures, setPictures] = useState<Pictures>({});
  const [error, setError] = useState();
  const [submissionResponse, setSubmissionResponse] = useState();
  const [pageState, setPageState] = useState(1);
  const [canProceed, setCanProceed] = useState(true);

  const updateState: UpdateStateFn = (props) => {
    if (props?.error) setError(props.error);
    if (props?.newProvider) setNewProvider(props.newProvider);
    if (props?.initialProvider) setInitialProvider(props.initialProvider);
    if (props?.submissionResponse)
      setSubmissionResponse(props.submissionResponse);
    if (props?.pictures) setPictures(props.pictures);
    if (props?.pageState) setPageState(props.pageState);
    if (props?.canProceed) setCanProceed(props.canProceed);
  };

  const pageStateTitles: PageStateTitle[] = [
    'Basic Details',
    'Contact',
    'About',
    'Professional Details',
    'Demographics',
    'Confirmation'
  ];

  const back = () => {
    if (pageState < 2) return;
    setPageState(pageState - 1);
  };

  const next = () => {
    if (pageState > 5) return;
    setPageState(pageState + 1);
  };

  const value: FormContextObject = {
    formData: {
      initialProvider,
      newProvider,
      pictures
    },
    formState: {
      pageState,
      pageStateTitles,
      canProceed,
      next,
      back,
      updateState
    },
    formFunctions: {
      register,
      handleSubmit
    },
    submissionResponse,
    error
  };
  return [FormContext, value];
};
