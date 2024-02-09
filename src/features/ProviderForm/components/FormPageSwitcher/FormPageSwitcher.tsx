import { useFormContext } from '../../utils/formContext';
import { Confirmation } from '../Confirmation';
import { FormStub } from '../FormStub';
import { ButtonGroup } from './ButtonGroup';
import { useFormAction } from '../../utils/api';

export const FormPageSwitcher = ({ setSubmissionResponse }) => {
  const {
    formState: {
      pageState,
      formType: { pageStateTitles, type }
    },
    // formFunctions: { handleSubmit },
    formData: { pictures }
  } = useFormContext();
  const submitProviderData = useFormAction(type);

  const currentPageStateTitle = pageStateTitles[pageState - 1];
  return (
    <div>
      <h3>{currentPageStateTitle}</h3>
      <div
      // onSubmit={handleSubmit(async (data) => {
      //   const submissionConfirmation = await submitProviderData(data);
      // })}
      >
        {currentPageStateTitle === 'Confirmation' ? (
          <Confirmation {...{ setSubmissionResponse }} />
        ) : (
          <FormStub type={currentPageStateTitle} />
        )}
      </div>
    </div>
  );
};
