import { FormProvider } from '@/types';
import { UseFormRegister } from 'react-hook-form';
export default function Input({
  register,
  dbName,
  type = 'text',
  element
}: {
  register: UseFormRegister<FormProvider>;
  dbName: keyof FormProvider['general'];
  type?: React.HTMLInputTypeAttribute;
  element?: 'textarea';
}) {
  const Element = element || 'input';
  return <Element type={type} {...register(`general.${dbName}`)} />;
}
