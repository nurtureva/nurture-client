import { FormProvider, Option, ProviderObject } from '@/types';
import { useFormContext } from './formContext';

const flattenArray = (array: Option[] | string[] | undefined) => {
  if (!array) return array;
  return array.map((option) => {
    const optionId = typeof option === 'string' ? option : option.id.toString();
    return optionId;
  });
};

export const createPageContent = (
  title: string,
  description: string,
  Content: React.FC<any>
) => {
  return { title, description, Content };
};

export const useDefaultValues = (): { defaultValues: FormProvider } | {} => {
  const { initialProvider, formProvider } = useFormContext();
  const provider = formProvider || initialProvider;
  if (!provider) return {};
  const { services, paymentOptions, certifications, ...generalInfo } = provider;
  return {
    defaultValues: {
      general: 'general' in generalInfo ? generalInfo.general : generalInfo,
      services: flattenArray(services),
      paymentOptions: flattenArray(paymentOptions),
      certifications: flattenArray(certifications)
    }
  };
};
