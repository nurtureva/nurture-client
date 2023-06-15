import { FormProvider, ProviderObject } from '@/types';
import { Context, createContext, useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

export type Pictures = {
  profile_photo?: File;
  logo?: File;
};

type UpdateStateFn = (props: {
  newProvider?: FormProvider;
  error?: any;
  initialProvider?: ProviderObject | FormProvider;
  pictures?: Pictures;
}) => void;

interface FormContextObject {
  initialProvider?: ProviderObject | FormProvider;
  newProvider?: FormProvider;
  error: any;
  pictures: Pictures;
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

  const updateState: UpdateStateFn = (props) => {
    if (props?.error) setError(props.error);
    if (props?.newProvider) setNewProvider(props.newProvider);
    if (props?.initialProvider) setInitialProvider(props.initialProvider);
    if (props?.pictures) setPictures(props.pictures);
  };

  const value: FormContextObject = {
    initialProvider,
    newProvider,
    error,
    pictures,
    updateState
  };
  return [FormContext, value];
};
