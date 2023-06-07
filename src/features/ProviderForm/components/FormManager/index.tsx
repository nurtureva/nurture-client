import { useEffect, useState } from 'react';
import { confirmationContent } from '../../layouts/Confirmation';
import { submissionContent } from '../../layouts/FormSubmissionResults';
import { formContent } from '../../layouts/Form';
import { useContextInitializer, useFormContext } from '../../utils/formContext';

const FormPageSwitcher = () => {
  const [content, setContent] = useState(formContent);
  const { pageState } = useFormContext();

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

  return (
    <div className="content-wrapper">
      {content.title && <h1>{content.title}</h1>}
      {content.description && <p>{content.description}</p>}
      <div>{content.Content ? <content.Content /> : ''}</div>
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
