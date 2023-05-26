import { useEffect, useState } from 'react';
import { confirmationContent } from '../../layouts/Confirmation';
import { submissionContent } from '../../layouts/FormSubmissionResults';
import { formContent } from '../../layouts/Form';
import { ContentObject, ProviderObject } from '@/types';

const FormManager = () => {
  const [pageState, setPageState] = useState(0);
  const [provider, setProvider] = useState<ProviderObject>();
  const [content, setContent] = useState<ContentObject>(formContent);

  const updateState = (pageState: number, provider: ProviderObject) => {
    setPageState(pageState);
    setProvider(provider);
  };

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
  const props = { updateState, provider };
  return (
    <div className="content-wrapper">
      {content.title && <h1>{content.title}</h1>}
      {content.description && <p>{content.description}</p>}
      <div>{content.Content ? <content.Content {...props} /> : ''}</div>
    </div>
  );
};

export default FormManager;
