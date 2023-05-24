import { FormProvider, Option, ProviderObject } from '../../../types';

const uploadPhoto = async (id: number, type: string, file: File) => {
  const formData = new FormData();
  formData.append('photo', file, `${id}-${type}.${file.type.split('/')[1]}`);

  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/upload`, {
    method: 'POST',
    body: formData
  });
  return res.json();
};

const flattenArray = (array: Option[] | string[] | undefined) => {
  if (!array) return array;
  return array.map((option) => {
    const optionId =
      typeof option === 'string' ? option : option.id?.toString();
    return optionId;
  });
};

const createPageContent = (
  title: string,
  description: string,
  Content: React.FC<any>
) => {
  return { title, description, Content };
};

const useDefaultValues = (
  provider: FormProvider | ProviderObject
): { defaultValues: FormProvider } | {} => {
  return provider
    ? {
        defaultValues: {
          general: 'general' in provider ? provider.general : provider,
          services: flattenArray(provider.services),
          paymentOptions: flattenArray(provider.paymentOptions),
          certifications: flattenArray(provider.certifications)
        }
      }
    : {};
};

export { uploadPhoto, useDefaultValues, createPageContent };
