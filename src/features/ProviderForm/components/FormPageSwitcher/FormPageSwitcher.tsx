import { useFormContext } from '../../utils/formContext';
import { Confirmation } from '../Confirmation';
import { FormStub } from '../FormStub';
import { ButtonGroup } from './ButtonGroup';
import { useFormAction } from '../../utils/api';

export const FormPageSwitcher = ({ setSubmissionResponse }) => {
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
          setSubmissionResponse(submissionConfirmation || 'error');
        })}>
        {currentPageStateTitle === 'Confirmation' ? (
          <Confirmation />
        ) : (
          <FormStub type={currentPageStateTitle} />
        )}
        <ButtonGroup
          isConfirmation={currentPageStateTitle === 'Confirmation'}
          disabled={!canProceed}
        />
      </form>
    </div>
  );
};
