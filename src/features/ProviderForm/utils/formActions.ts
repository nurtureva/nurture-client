import { ProviderObject } from '@/types';
import { useFormContext } from './formContext';

const submitNewProvider = async (provider: ProviderObject) => {
  console.log('submit');
};

const editProvider = async (provider: ProviderObject) => {
  console.log('edit');
};

export type FormActionType = 'create' | 'update';

export const useFormAction = (type: FormActionType) => {
  const { provider, setPageState } = useFormContext();
  setPageState(2);

  switch (type) {
    case 'create':
      return () => submitNewProvider(provider);
    case 'update':
      return () => editProvider(provider);
  }
};

const test = (value: string) => {
  return () => {
    console.log(value);
  };
};

const foo = test('gdfgsdfgs');

foo();
