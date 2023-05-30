import { useContext, useEffect, useState } from 'react';
import { confirmationContent } from '../../layouts/Confirmation';
import { submissionContent } from '../../layouts/FormSubmissionResults';
import { formContent } from '../../layouts/Form';
import { useContextInitializer, useFormContext } from '../../utils/formContext';

const FormSwitcher = ({ formAction }: { formAction: Function }) => {
  const [content, setContent] = useState(formContent);
  const { pageState, updateState, provider } = useFormContext();

  useEffect(() => {
    switch (pageState) {
      case 0:
        setContent(formContent);
        break;
      case 1:
        setContent(confirmationContent);
        break;
      case 2:
        setContent(submissionContent);
        break;
    }
  }, [pageState]);

  if (!content) return null;
  const props = { updateState, provider, formAction };
  return (
    <div className="content-wrapper">
      {content.title && <h1>{content.title}</h1>}
      {content.description && <p>{content.description}</p>}
      <div>{content.Content ? <content.Content {...props} /> : ''}</div>
    </div>
  );
};

const FormManager = ({ formAction }: { formAction: Function }) => {
  const [FormContext, value] = useContextInitializer();
  return (
    <FormContext.Provider value={value}>
      <FormSwitcher formAction={formAction} />
    </FormContext.Provider>
  );
};

export default FormManager;
