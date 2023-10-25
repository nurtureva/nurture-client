import { ProviderObject } from '../../types';

export const Address = ({ provider }: { provider: ProviderObject }) => {
  const address_1 = provider.address_1 || '';
  const address_2 = provider.address_2 || '';
  const city = provider.city || '';
  const state = provider.state || '';
  const zip = provider.zip || '';

  return (
    <p>
      {`${address_1} ${address_2} ${city ? city + ',' : ''} ${state} ${zip}`}
    </p>
  );
};
