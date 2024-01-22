import { Button } from '@/components';
import { useFormContext } from '../../utils/formContext';
import { ButtonProps } from '@/types';

export const ButtonGroup = ({
  disabled,
  isConfirmation
}: {
  disabled?: boolean;
  isConfirmation: boolean;
}) => {
  const {
    formState: {
      back,
      next,
      pageState,
      formType: { pageStateTitles }
    }
  } = useFormContext();

  const buttonProps: ButtonProps = isConfirmation
    ? {
        children: 'Submit',
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
