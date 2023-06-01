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

  switch (type) {
    case 'create':
      return () => {
        submitNewProvider(provider);
        setPageState(2);
      };
    case 'update':
      return () => {
        editProvider(provider);
        setPageState(2);
      };
  }
};
