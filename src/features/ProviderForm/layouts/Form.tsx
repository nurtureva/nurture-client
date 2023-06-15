import { useForm } from 'react-hook-form';
import FormItem from '../components/FormItem';
import Input from '../components/Input';
import { useFormInputList } from '../utils/formInputList';
import { createPageContent, useDefaultValues } from '../utils/helpers';
import { useFormContext } from '../utils/formContext';
import { FormProvider } from '@/types';

import PhotosContainer from '../components/PhotoInput';

export default function ProviderForm() {
  const { updateState } = useFormContext();

  const defaultValues = useDefaultValues();
  const { register, handleSubmit } = useForm<FormProvider>(defaultValues);
  const formInputList = useFormInputList();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        updateState({ newProvider: data });
      })}>
      {formInputList.map((input, i) => {
        return (
          <FormItem description={input.description} name={input.name} key={i}>
            {'Element' in input ? (
              <input.Element register={register} {...input.props} />
            ) : (
              <Input
                register={register}
                dbName={input.dbName}
                {...input.props}
              />
            )}
          </FormItem>
        );
      })}
      <PhotosContainer />
      <input type="submit" />
    </form>
  );
}

const formContent = createPageContent(
  'Add your practice to the directory',
  'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
  ProviderForm
);

export { formContent };
