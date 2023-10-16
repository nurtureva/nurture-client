import { useFormContext } from 'react-hook-form';
import { Initializer } from '../..';
import { FormType } from '../../types';
import { useContextInitializer } from '../../utils/formContext';
import { FormPageSwitcher } from '../FormPageSwitcher';
import { PageStateIndicatorList } from '../PageStateIndicatorList';

export const FormManager = ({ formType }: { formType: FormType }) => {
  const [FormContext, value] = useContextInitializer(formType);

  return (
    <FormContext.Provider value={value}>
      <div className="content-wrapper">
        <div className="content-main form-container">
          <section>
            <PageStateIndicatorList />
            <FormPageSwitcher />
          </section>
        </div>
      </div>
    </FormContext.Provider>
  );
};
