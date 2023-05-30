import { useLoaderData } from 'react-router-dom';
import { createPageContent } from '../utils/helpers';
import { FormProvider, ProviderOptions } from '@/types';

export default function Confirmation({
  updateState,
  provider,
  formAction
}: {
  updateState: Function;
  provider: FormProvider;
  formAction: Function;
}) {
  const { services, paymentOptions, certifications } =
    useLoaderData() as ProviderOptions;
  return (
    <>
      <ul>
        {Object.entries(provider.general).map((inputValue) => {
          const [label, userResponse] = inputValue;
          if (userResponse?.length) {
            let value =
              typeof userResponse === 'string'
                ? userResponse
                : userResponse[0].name;
            return (
              <li key={label}>
                {label}: {value}
              </li>
            );
          }
        })}
      </ul>
      <button
        onClick={() => {
          formAction();
        }}>
        confirm
      </button>
      <button
        onClick={() => {
          updateState(0, provider);
        }}>
        edit
      </button>
    </>
  );
}

const confirmationContent = createPageContent(
  'Confirm Your Details',
  'Thank you for submitting your details! Please check your information below and click to CONFIRM. Click EDIT to go back and make changes. After confirming, a copy of this form will be emailed to you at anna@example.com.',
  Confirmation
);

export { confirmationContent };
