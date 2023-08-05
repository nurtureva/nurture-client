import { useForm } from 'react-hook-form';
import { useFormContext } from '../../utils/formContext';
import { Confirmation } from '../Confirmation';
import { FormStub } from '../FormStub';
import { FormProvider } from '@/types';
import { ButtonGroup } from './ButtonGroup';

export const FormPageSwitcher = () => {
  const { pageStateTitles, pageState, updateState } = useFormContext();
  const currentPageStateTitle = pageStateTitles[pageState - 1];
  const { register, handleSubmit } = useForm<FormProvider>();

  return (
    <div>
      <h3>{currentPageStateTitle}</h3>
      <form
        onSubmit={handleSubmit((data) => {
          updateState({ newProvider: data });
        })}>
        {currentPageStateTitle === 'Confirmation' ? (
          <Confirmation />
        ) : (
          <FormStub register={register} type={currentPageStateTitle} />
        )}
        <ButtonGroup
          isConfirmation={currentPageStateTitle === 'Confirmation'}
        />
      </form>
    </div>
  );
};
