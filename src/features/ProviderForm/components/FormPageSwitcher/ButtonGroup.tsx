import { Button } from '@/components';
import { useFormContext } from '../../utils/formContext';
import { ButtonProps } from '@/types';

export const ButtonGroup = ({ disabled }: { disabled?: boolean }) => {
  const {
    formState: {
      back,
      next,
      pageState,
      formType: { pageStateTitles }
    },
    formData: { newProvider }
  } = useFormContext();
  const isConfirmation = pageStateTitles[pageState] === 'Confirmation';
  const buttonProps: ButtonProps = isConfirmation
    ? {
        children: 'Submit',
        onClick: () => {
          console.log('submit', newProvider);
        }
      }
    : { onClick: next, children: 'Save and Continue', isSubmit: true };

  return (
    <div>
      <p onClick={back}>Back</p>
      <Button className={disabled ? 'disabled' : ''} {...buttonProps} />
    </div>
  );
};
