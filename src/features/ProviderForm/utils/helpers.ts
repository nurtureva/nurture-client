import { FormProvider, Option } from '@/types';

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

export const useDefaultValues = (
  provider?: FormProvider
): Partial<FormProvider> => {
  if (!provider) return;
  const defaultProvider = Object.entries(provider).reduce(
    (result, [key, value]) => {
      if (!value) return result;
      if (Array.isArray(value)) {
        result[key as keyof FormProvider] = flattenArray(value);
      } else {
        result.general[key as keyof FormProvider['general']] = value;
      }
      return result;
    },
    { general: {} } as FormProvider
  );
  return defaultProvider;
};
