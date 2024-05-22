import { Icon, Input } from '@/components';
import { InputProps } from '@/types';

export const FormInput = (props: InputProps) => {
  const { dbName, required, minLength, maxLength, pattern, errorMessage, isTextArea, register, errors, ...otherInputProps } = props;
  // @ts-ignore

  const { ref, ...registerProps } = register(`general.${dbName}`, {required, minLength, maxLength, pattern});
  const inputProps = { ...otherInputProps, ...registerProps };
  if (isTextArea) return <textarea {...{ ref, ...inputProps }} />;
  return (
    <>
      <Input {...inputProps} innerRef={ref} />
    </>
  );
};
