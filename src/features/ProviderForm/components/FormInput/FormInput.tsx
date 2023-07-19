import { Input } from '@/components';
import { FormProvider } from '@/types';
import { UseFormRegister } from 'react-hook-form';
export const FormInput = ({
  register,
  dbName,
  type = 'text',
  element
}: {
  register: UseFormRegister<FormProvider>;
  dbName: keyof FormProvider['general'];
  type?: React.HTMLInputTypeAttribute;
  element?: 'textarea';
}) => {
  const { ref, ...registerProps } = register(`general.${dbName}`);

  if (element) return <textarea {...{ ref, ...registerProps }} />;
  return <Input {...{ type, ...registerProps }} innerRef={ref} />;
};
