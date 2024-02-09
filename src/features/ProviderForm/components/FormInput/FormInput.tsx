import { Input } from '@/components';
import { InputProps } from '@/types';
import { useFormContext } from '../../utils/formContext';

export const FormInput = (props: InputProps) => {
  const { dbName, isTextArea, register, ...otherInputProps } = props;

  // @ts-ignore
  const { ref, ...registerProps } = register(`general.${dbName}`);
  const inputProps = { ...otherInputProps, ...registerProps };

  if (isTextArea) return <textarea {...{ ref, ...inputProps }} />;
  return <Input {...inputProps} innerRef={ref} />;
};
