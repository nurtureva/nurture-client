import { useFormInputList } from '../../utils/formInputList';
import { FormItem } from '../FormItem';
import { PageStateTitle } from '@/types';

export const FormStub = ({ type }: { type: PageStateTitle }) => {
  const formInputList = useFormInputList();

  return (
    <>
      {formInputList.map((input, i) => {
        if (input.stubName === type) return <FormItem input={input} key={i} />;
      })}
    </>
  );
};
