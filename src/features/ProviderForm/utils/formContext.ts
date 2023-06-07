import { FormProvider, ProviderObject } from '@/types';
import { Context, createContext, useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

interface FormContextObject {
  pageState: number;
  initialProvider?: ProviderObject;
  formProvider?: FormProvider;
  error: any;
  updateState: (
    pageState: number,
    props?: { provider?: FormProvider; error?: any }
  ) => void;
}

const FormContext = createContext({} as FormContextObject);

export const useFormContext = () => useContext(FormContext);

export const useContextInitializer = (): [
  Context<FormContextObject>,
  FormContextObject
] => {
  const { provider: provider } = useLoaderData() as {
    provider: ProviderObject;
  };
  const [pageState, setPageState] = useState(0);
  const [error, setError] = useState();
  const [formProvider, setFormProvider] = useState<FormProvider>();
  const updateState = (
    pageState: number,
    props?: { provider?: FormProvider; error?: any }
  ) => {
    setPageState(pageState);
    if (props?.error) setError(props.error);
    if (props?.provider) setFormProvider(props.provider);
  };
  const value: FormContextObject = {
    pageState,
    initialProvider: provider,
    formProvider,
    error,
    updateState
  };
  return [FormContext, value];
};
