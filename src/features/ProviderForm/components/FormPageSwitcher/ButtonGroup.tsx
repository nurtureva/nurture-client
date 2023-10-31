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
    }
  } = useFormContext();

  const isConfirmation = pageStateTitles[pageState - 1] === 'Confirmation';

  const buttonProps: ButtonProps = isConfirmation
    ? {
        children: 'Submit',
        onClick: () => {
          console.log('submit');
        },
        isSubmit: true
      }
    : {
        onClick: (e) => {
          e.preventDefault();
          next();
        },
        children: 'Save and Continue'
      };

  return (
    <div>
      <p onClick={back}>Back</p>
      <Button className={disabled ? 'disabled' : ''} {...buttonProps} />
    </div>
  );
};
