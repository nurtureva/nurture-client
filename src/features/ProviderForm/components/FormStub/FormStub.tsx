import { useFormContext } from '../../utils/formContext';
import { useFormInputList } from '../../utils/formInputList';
import { FormItem } from '../FormItem';
import { PageStateTitle } from '@/types';

export const FormStub = ({ type }: { type: PageStateTitle }) => {
  const {
    formState: {
      formType: { inputList }
    }
  } = useFormContext();

  return (
    <>
      {inputList.map((input, i) => {
        if (input.stubName === type) return <FormItem input={input} key={i} />;
      })}
    </>
  );
};
