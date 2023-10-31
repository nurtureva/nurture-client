import { FormProvider, Option, ProviderObject } from '@/types';
import { useFormContext } from './formContext';
import { useLoaderData } from 'react-router-dom';

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

export const useDefaultValues = (): FormProvider | {} => {
  const { provider: initialProvider } = useLoaderData() as {
    provider: ProviderObject;
  };
  const provider = initialProvider;
  if (!provider)
    return {
      general: {
        profile_photo: undefined,
        logo: undefined
      }
    };
  const { services, paymentOptions, certifications, ...providerDetails } =
    provider;

  return {
    general:
      'general' in providerDetails ? providerDetails.general : providerDetails,
    services: flattenArray(services),
    paymentOptions: flattenArray(paymentOptions),
    certifications: flattenArray(certifications)
  };
};
