import { useContextInitializer } from '../../utils/formContext';
import { FormPageSwitcher } from '../FormPageSwitcher';
import { PageStateIndicatorList } from '../PageStateIndicatorList';

export const FormManager = () => {
  const [FormContext, value] = useContextInitializer();
  return (
    <FormContext.Provider value={value}>
      <div className="content-wrapper">
        <h2>Add your information to the Directory</h2>
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
