import { useFormContext } from '../../utils/formContext';
import { FormItem } from '../FormItem';
import { PageStateTitle } from '@/types';

export const FormStub = ({ type }: { type: PageStateTitle }) => {
  const {
    formState: {
      formType: { formFields }
    }
  } = useFormContext();
  return (
    <>
      {formFields.map((input, i) => {
        if (input.stubName === type) return <FormItem input={input} key={i} />;
      })}
    </>
  );
};
