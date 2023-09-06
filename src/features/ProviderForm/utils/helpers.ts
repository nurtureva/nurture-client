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
  const {
    formData: { initialProvider, newProvider }
  } = useFormContext();
  const provider = newProvider || initialProvider;
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
    defaultValues: {
      general:
        'general' in providerDetails
          ? providerDetails.general
          : providerDetails,
      services: flattenArray(services),
      paymentOptions: flattenArray(paymentOptions),
      certifications: flattenArray(certifications)
    }
  };
};
