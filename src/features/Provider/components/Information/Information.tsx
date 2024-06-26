import { Option, ProviderObject } from '../../types';
import { Address } from '../Address';

export const Information = ({ provider }: { provider: ProviderObject }) => {
  const stringifyOptionList = (list: Option[], title: string) => {
    if (!list) return '';

    let stringList = title + ': ';
    list.forEach((item, index) => {
      stringList += item.name;
      if (index !== list.length - 1) stringList += ', ';
    });

    return stringList;
  };
  const { paymentOptions, certifications } = provider;
  return (
    <>
      <Address provider={provider} />
      <p>
        {paymentOptions &&
          stringifyOptionList(paymentOptions, 'payment options')}
      </p>
      <p>
        {certifications &&
          stringifyOptionList(certifications, 'certifications')}
      </p>
    </>
  );
};
