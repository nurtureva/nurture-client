import { useForm } from 'react-hook-form';
import { useFormContext } from '../../utils/formContext';
import { Confirmation } from '../Confirmation';
import { FormStub } from '../FormStub';
import { FormProvider } from '@/types';
import { ButtonGroup } from './ButtonGroup';
import { useState } from 'react';

export const FormPageSwitcher = () => {
  const {
    formState: { pageStateTitles, pageState, updateState, canProceed },
    formFunctions: { handleSubmit }
  } = useFormContext();
  const currentPageStateTitle = pageStateTitles[pageState - 1];

  return (
    <div>
      <h3>{currentPageStateTitle}</h3>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          updateState({ newProvider: data });
        })}>
        {currentPageStateTitle === 'Confirmation' ? (
          <Confirmation />
        ) : (
          <FormStub type={currentPageStateTitle} />
        )}
        <ButtonGroup disabled={canProceed} />
      </form>
    </div>
  );
};
