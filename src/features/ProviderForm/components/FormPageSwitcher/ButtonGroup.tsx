import { Button } from '@/components';
import { useFormContext } from '../../utils/formContext';
import { ButtonProps } from '@/types';

export const ButtonGroup = ({
  isConfirmation
}: {
  isConfirmation?: boolean;
}) => {
  const { back, next, newProvider } = useFormContext();

  const buttonProps: ButtonProps = isConfirmation
    ? {
        children: 'Submit',
        onClick: () => {
          console.log(newProvider);
        }
      }
    : { onClick: next, children: 'Save and Continue', isSubmit: true };

  return (
    <span>
      <p onClick={back}>back</p>
      <Button {...buttonProps} />
    </span>
  );
};
