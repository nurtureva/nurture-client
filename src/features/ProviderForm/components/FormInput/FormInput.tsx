import { Input } from '@/components';
import { FormProvider } from '@/types';
import { useFormContext } from '../../utils/formContext';
export const FormInput = (props: {
  dbName: keyof FormProvider['general'];
  type?: React.HTMLInputTypeAttribute;
  element?: 'textarea';
  onBlur?: Function;
}) => {
  const { dbName, type = 'text', element, ...otherInputProps } = props;
  const inputProps = { type, ...otherInputProps };
  const {
    formFunctions: { register }
  } = useFormContext();
  const { ref, ...registerProps } = register(`general.${dbName}`);

  if (element) return <textarea {...{ ref, ...registerProps }} />;
  return <Input {...{ ...registerProps, ...inputProps }} innerRef={ref} />;
};
