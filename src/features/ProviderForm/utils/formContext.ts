import { ProviderObject } from '@/types';
import { Context, createContext, useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

interface FormContextObject {
  pageState: number;
  setPageState: React.Dispatch<React.SetStateAction<number>>;
  provider: ProviderObject;
  setProvider: React.Dispatch<React.SetStateAction<ProviderObject>>;
  updateState: (pageState: number, provider?: ProviderObject) => void;
}

const FormContext = createContext({} as FormContextObject);

export const useFormContext = () => useContext(FormContext);

export const useContextInitializer = (): [
  Context<FormContextObject>,
  FormContextObject
] => {
  const { provider: initialProvider } = useLoaderData() as {
    provider: ProviderObject;
  };
  const [pageState, setPageState] = useState(0);
  const [provider, setProvider] = useState<ProviderObject>(initialProvider);
  const updateState = (pageState: number, provider?: ProviderObject) => {
    setPageState(pageState);
    if (provider) setProvider(provider);
  };
  const value: FormContextObject = {
    pageState,
    setPageState,
    provider,
    setProvider,
    updateState
  };
  return [FormContext, value];
};
