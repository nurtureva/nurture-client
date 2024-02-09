import { Button } from '@/components';
import { useFormContext } from '../../utils/formContext';
import { ButtonProps } from '@/types';
import { useFormAction } from '../../utils/api';

export const ButtonGroup = ({
  disabled,
  isConfirmation,
  setSubmissionResponse
}: {
  disabled?: boolean;
  isConfirmation: boolean;
}) => {
  const {
    formState: {
      back,
      formType: { pageStateTitles, type }
    },
    formData: { newProvider }
  } = useFormContext();
  const submitProviderData = useFormAction(type);

  const buttonProps: ButtonProps = isConfirmation
    ? {
        children: 'Submit',
        onClick: async (e) => {
          e.preventDefault();
          const submissionConfirmation = await submitProviderData(newProvider);
          const message = window.location.pathname.includes('provider-form')
            ? 'Your information has been submitted. Please allow two weeks for us to review and add you to the database.'
            : 'Your new information has been submitted. Your information should be live now.';
          setSubmissionResponse(message || 'error');

          console.log(submissionConfirmation);
        }
      }
    : {
        children: 'Save and Continue',
        isSubmit: true
      };

  return (
    <div className="button-group">
      <p onClick={back}>Back</p>
      <Button className={disabled ? 'disabled' : ''} {...buttonProps} />
    </div>
  );
};
