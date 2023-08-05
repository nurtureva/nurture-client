import { FormProvider, PageStateTitle, ProviderObject } from '@/types';
import { Context, createContext, useContext, useEffect, useState } from 'react';
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
}) => void;

interface FormContextObject {
  initialProvider?: ProviderObject | FormProvider;
  newProvider?: FormProvider;
  error: any;
  submissionResponse: any;
  pictures: Pictures;
  pageState: number;
  pageStateTitles: PageStateTitle[];
  next: () => void;
  back: () => void;
  updateState: UpdateStateFn;
}

type ContextInitializer = () => [Context<FormContextObject>, FormContextObject];

const FormContext = createContext({} as FormContextObject);

export const useFormContext = () => useContext(FormContext);

export const useContextInitializer: ContextInitializer = () => {
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

  const updateState: UpdateStateFn = (props) => {
    if (props?.error) setError(props.error);
    if (props?.newProvider) setNewProvider(props.newProvider);
    if (props?.initialProvider) setInitialProvider(props.initialProvider);
    if (props?.submissionResponse)
      setSubmissionResponse(props.submissionResponse);
    if (props?.pictures) setPictures(props.pictures);
    if (props?.pageState) setPageState(props.pageState);
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
    initialProvider,
    submissionResponse,
    newProvider,
    error,
    pictures,
    pageState,
    pageStateTitles,
    next,
    back,
    updateState
  };
  return [FormContext, value];
};
