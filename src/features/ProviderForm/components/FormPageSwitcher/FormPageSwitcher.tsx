import { useFormContext } from '../../utils/formContext';
import { Confirmation } from '../../layouts/Confirmation';
import { FormStub } from '../../layouts/FormStub';
import { useEffect } from 'react';

export const FormPageSwitcher = () => {
  const {
    formState: {
      pageState,
      formType: { pageStateTitles }
    }
  } = useFormContext();

  useEffect(() => {
    window.scrollTo(0, 0);

  }, [pageState])

  const currentPageStateTitle = pageStateTitles[pageState - 1];
  return (
    <div>
      <h3>{currentPageStateTitle}</h3>
      <div>
        {currentPageStateTitle === 'Confirmation' ? (
          <Confirmation />
        ) : (
          <FormStub type={currentPageStateTitle} />
        )}
      </div>
    </div>
  );
};
