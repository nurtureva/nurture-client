import { UseFormRegister, useForm } from 'react-hook-form';
import { useFormInputList } from '../../utils/formInputList';
import { FormItem } from '../FormItem';
import { FormInput } from '../FormInput';
import { FormProvider, PageStateTitle } from '@/types';
import { ButtonGroup } from '../FormPageSwitcher/ButtonGroup';

export const FormStub = ({
  type,
  register
}: {
  type: PageStateTitle;
  register: UseFormRegister<FormProvider>;
}) => {
  const formInputList = useFormInputList();
  return (
    <>
      {formInputList.map((input, i) => {
        if (input.stubName === type)
          return (
            <FormItem
              description={input.description}
              size={input.size}
              name={input.name}
              key={i}>
              {'Element' in input ? (
                <input.Element register={register} {...input.props} />
              ) : (
                <FormInput
                  register={register}
                  dbName={input.dbName}
                  {...input.props}
                />
              )}
            </FormItem>
          );
      })}
    </>
  );
};
