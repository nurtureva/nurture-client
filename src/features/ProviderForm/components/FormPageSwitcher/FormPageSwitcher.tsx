import { useForm } from 'react-hook-form';
import { useFormContext } from '../../utils/formContext';
import { Confirmation } from '../Confirmation';
import { FormStub } from '../FormStub';
import { FormProvider } from '@/types';
import { ButtonGroup } from './ButtonGroup';
import { submitProvider, useFormAction } from '../../utils/api';
import { useState } from 'react';

export const FormPageSwitcher = () => {
  const {
    formState: {
      pageState,
      canProceed,
      formType: { pageStateTitles, type }
    },
    formFunctions: { handleSubmit }
  } = useFormContext();
  const submitProviderData = useFormAction(type);

  const currentPageStateTitle = pageStateTitles[pageState - 1];

  return (
    <div>
      <h3>{currentPageStateTitle}</h3>
      <form
        onSubmit={handleSubmit(async (data) => {
          console.log(data);
          const submissionConfirmation = await submitProviderData(data);
          console.log(submissionConfirmation);
        })}>
        {currentPageStateTitle === 'Confirmation' ? (
          <Confirmation />
        ) : (
          <FormStub type={currentPageStateTitle} />
        )}
        <ButtonGroup disabled={!canProceed} />
      </form>
    </div>
  );
};
