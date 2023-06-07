import { useEffect, useState } from 'react';
import { useFormContext } from '../utils/formContext';
import { createPageContent } from '../utils/helpers';

export default function FormSubmissionResults() {
  const { error } = useFormContext();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const setError = async () => {
      const errorObj = await error;
      console.log(errorObj.error);
      setErrorMessage(errorObj.error);
    };
    setError();
  }, []);
  console.log(errorMessage);

  return <p>{error ? errorMessage : 'Thanks!'}</p>;
}

const submissionContent = createPageContent(
  'Thank You',
  'Your information has been submitted. Please allow xxxx weeks for us to review and add you to the database.',
  FormSubmissionResults
);

export { submissionContent };
