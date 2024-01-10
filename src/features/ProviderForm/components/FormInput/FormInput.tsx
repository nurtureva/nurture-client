import { Input } from '@/components';
import { FormProvider } from '@/types';
import { useFormContext } from '../../utils/formContext';
export const FormInput = (props: {
  dbName: keyof FormProvider['general'];
  type?: React.HTMLInputTypeAttribute;
  id?: string;
  element?: 'textarea';
  onBlur?: Function;
  parentObjectName?: 'string';
}) => {
  const {
    dbName,
    type = 'text',
    element,
    parentObjectName = 'general',
    ...otherInputProps
  } = props;

  const {
    formFunctions: { register }
  } = useFormContext();
  // @ts-ignore
  const { ref, ...registerProps } = register(`${parentObjectName}.${dbName}`);
  const inputProps = { type, ...otherInputProps, ...registerProps };

  if (element) return <textarea {...{ ref, ...inputProps }} />;
  return <Input {...inputProps} innerRef={ref} />;
};
