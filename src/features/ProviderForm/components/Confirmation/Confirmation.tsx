import { useLoaderData } from 'react-router-dom';
import { useFormContext } from '../../utils/formContext';
import { ProviderOptions } from '@/types';
import { OptionList } from '../OptionList';

export const Confirmation = () => {
  const { services, paymentOptions, certifications } =
    useLoaderData() as ProviderOptions;
  const {
    formData: { newProvider: provider, pictures }
  } = useFormContext();
  console.log(pictures);
  if (!provider) return null;

  return (
    <>
      <ul>
        {Object.entries(provider.general).map((inputValue) => {
          const [label, userResponse] = inputValue;

          if (userResponse) {
            const value = userResponse;
            return (
              <li key={label}>
                {label}: {value.toString()}
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
        {/* {Object.entries(pictures).map((pictureEntry) => {
          const [label, picture] = pictureEntry;
          if (picture)
            return (
              <li key={label}>
                {label}: <img src={URL.createObjectURL(picture)} />
              </li>
            );
          return '';
        })} */}
      </ul>
    </>
  );
};
