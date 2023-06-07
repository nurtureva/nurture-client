import { useLoaderData } from 'react-router-dom';
import { Option, ProviderOptions } from '@/types';
import { createPageContent } from '../utils/helpers';
import { editProvider, submitNewProvider } from '../utils/api';
import { useFormContext } from '../utils/formContext';

export default function Confirmation() {
  const { services, paymentOptions, certifications } =
    useLoaderData() as ProviderOptions;
  const { formProvider: provider, updateState } = useFormContext();
  if (!provider) return null;
  return (
    <>
      <ul>
        {Object.entries(provider.general).map((inputValue) => {
          const [label, userResponse] = inputValue;
          if (userResponse?.length) {
            let value = userResponse;
            return (
              <li key={label}>
                {label}: {value}
              </li>
            );
          }
        })}
        <OptionList
          idList={provider.services}
          fullList={services}
          title="services"
        />
        <OptionList
          idList={provider.paymentOptions}
          fullList={paymentOptions}
          title="payment options"
        />
        <OptionList
          idList={provider.certifications}
          fullList={certifications}
          title="certifications"
        />
      </ul>
      <button
        onClick={async () => {
          try {
            if (window.location.pathname.includes('provider-form')) {
              await submitNewProvider(provider);
            } else {
              const id = Number(window.location.pathname.split('/')[1]);
              await editProvider(provider, id);
            }
            updateState(2);
          } catch (error) {
            //TODO either fix the way api.fetcher.ts handles responses (i.e. json vs text vs something else), or make sure the server sends everything in a stringified object
            console.log(error);
            updateState(2, { error: error.json() });
          }
        }}>
        confirm
      </button>
      <button
        onClick={() => {
          updateState(0, { provider });
        }}>
        edit
      </button>
    </>
  );
}

const OptionList = ({
  idList,
  fullList,
  title
}: {
  idList: string[] | undefined;
  fullList: Option[] | undefined;
  title: string;
}) => {
  if (!idList?.length) return <></>;
  return (
    <li>
      <ul>
        <label>{title}:</label>
        {idList.map((optionId) => {
          const fullOption = fullList?.find(
            (option) => option.id === Number(optionId)
          );
          if (!fullOption) return;
          return <li key={optionId}>{fullOption.name}</li>;
        })}
      </ul>
    </li>
  );
};

const confirmationContent = createPageContent(
  'Confirm Your Details',
  'Thank you for submitting your details! Please check your information below and click to CONFIRM. Click EDIT to go back and make changes. After confirming, a copy of this form will be emailed to you at anna@example.com.',
  Confirmation
);

export { confirmationContent };
