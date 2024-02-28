import { Input } from '@/components';
import { InputProps } from '@/types';

export const FormInput = (props: InputProps) => {
  const { dbName,required, isTextArea, register, errors, ...otherInputProps } = props;
  // @ts-ignore
  const { ref, ...registerProps } = register(`general.${dbName}`, {required});
  const inputProps = { ...otherInputProps, ...registerProps };
  if (isTextArea) return <textarea {...{ ref, ...inputProps }} />;
  return (
    <>
      <Input {...inputProps} innerRef={ref} />
      {'general' in errors && errors.general[dbName] && (
        <span className='error-message'>This field is required</span>
      )}
    </>
  );
};
