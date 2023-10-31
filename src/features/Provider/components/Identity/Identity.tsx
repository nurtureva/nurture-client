import { ProviderObject } from '../../types';

export const Identity = ({ provider }: { provider: ProviderObject }) => {
  const typeOfCare = provider.services || [];
  let typeOfCareString = '';
  typeOfCare.forEach((service, index) => {
    typeOfCareString += service.name;
    if (index !== typeOfCare.length - 1) typeOfCareString += ', ';
  });
  return (
    <>
      <h2>{provider.name}</h2>
      {provider.business_name && (
        <p style={{ fontWeight: 500 }}>{provider.business_name}</p>
      )}
      <p style={{ margin: '5px 0 10px 0' }}>{typeOfCareString}</p>
    </>
  );
};
