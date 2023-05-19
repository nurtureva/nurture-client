import { createPageContent } from '../utils/helpers';

export default function FormSubmissionResults() {
  return <p>Thanks!</p>;
}

const submissionContent = createPageContent(
  'Thank You',
  'Your information has been submitted. Please allow xxxx weeks for us to review and add you to the database.',
  FormSubmissionResults
);

export { submissionContent };
