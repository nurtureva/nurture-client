import { useEffect, useState } from 'react';
import { ProviderForm } from '../components/NewProviderForm/NewProviderForm';
import Confirmation from '../layouts/Confirmation';
import FormSubmissionResults from '../layouts/FormSubmissionResults';
const createPageContent = (title, description, Content) => {
  return { title, description, Content };
};

const formContent = createPageContent(
  'Add your practice to the directory',
  'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
  ProviderForm
);
const confirmationContent = createPageContent(
  'Confirm Your Details',
  'Thank you for submitting your details! Please check your information below and click to CONFIRM. Click EDIT to go back and make changes. After confirming, a copy of this form will be emailed to you at anna@example.com.',
  Confirmation
);
const submissionContent = createPageContent(
  'Thank You',
  'Your information has been submitted. Please allow xxxx weeks for us to review and add you to the database.',
  FormSubmissionResults
);

export default function useFormContent() {
  const [pageContent, setPageContent] = useState(formContent);
  const [pageState, setPageState] = useState(0);

  const changePageState = (pageState, provider) => {
    setPageState(pageState);
    if (provider) confirmationContent.provider = provider;
  };
  useEffect(() => {
    let content;
    switch (pageState) {
      case 0:
        content = formContent;
        break;
      case 1:
        content = confirmationContent;
        break;
      case 2:
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
