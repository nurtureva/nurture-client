import { useEffect, useState } from 'react';
import { formContent } from '../components/NewProviderForm/NewProviderForm';
import { confirmationContent } from '../layouts/Confirmation';
import { submissionContent } from '../layouts/FormSubmissionResults';

export default function useFormContent() {
  const [pageContent, setPageContent] = useState(formContent);
  const [pageState, setPageState] = useState();

  const changePageState = (pageState, provider) => {
    setPageState(pageState);
    if (provider)
      pageState === '1'
        ? (confirmationContent.provider = provider)
        : (formContent.provider = provider);
  };
  useEffect(() => {
    let content;
    switch (pageState) {
      case '0':
        console.log('fail');
        content = formContent;
        break;
      case '1':
        console.log('fail');
        content = confirmationContent;
        break;
      case '2':
        console.log('test');
        content = submissionContent;
        break;
      default:
        content = formContent;
        break;
    }

    setPageContent(content);
  }, [pageState]);
  return { ...pageContent, changePageState };
}
