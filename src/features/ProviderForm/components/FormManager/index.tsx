import { useEffect, useState } from 'react';
import { confirmationContent } from '../../layouts/Confirmation';
import { submissionContent } from '../../layouts/FormSubmissionResults';
import { formContent } from '../../layouts/Form';
import { useContextInitializer, useFormContext } from '../../utils/formContext';

const FormPageSwitcher = () => {
  const [content, setContent] = useState(formContent);
  const { newProvider, initialProvider } = useFormContext();

  useEffect(() => {
    //when newProvider changes, that means the form was just submitted –– move on to confirmation page.
    setContent(confirmationContent);
  }, [newProvider]);

  useEffect(() => {
    //when initial provider is set, that means initial page load or the user wants to edit their form data. –– move to Form page.
    setContent(formContent);
  }, [initialProvider]);

  if (!content) return null;

  return (
    <div className="content-wrapper">
      {content.title && <h1>{content.title}</h1>}
      {content.description && <p>{content.description}</p>}
      <div>
        <content.Content />
      </div>
    </div>
  );
};

const FormManager = () => {
  const [FormContext, value] = useContextInitializer();
  return (
    <FormContext.Provider value={value}>
      <FormPageSwitcher />
    </FormContext.Provider>
  );
};

export default FormManager;
