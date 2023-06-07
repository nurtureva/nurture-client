import { useForm } from 'react-hook-form';
import FormItem from '../components/FormItem';
import Input from '../components/Input';
import { useFormInputList } from '../utils/formInputList';
import { createPageContent, useDefaultValues } from '../utils/helpers';
import { useFormContext } from '../utils/formContext';

export default function ProviderForm() {
  const { updateState } = useFormContext();
  const formInputList = useFormInputList();
  const defaultValues = useDefaultValues();
  const { register, handleSubmit } = useForm(defaultValues);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        updateState(1, { provider: data });
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
