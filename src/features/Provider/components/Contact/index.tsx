import { GlobalOutlined, MailOutlined, PhoneFilled } from '@ant-design/icons';
import { ProviderObject } from '../../types';

export default function Contact({
  provider,
  title
}: {
  provider: ProviderObject;
  title?: string;
}) {
  const sanitizeURL = (url: string) => {
    if (url.includes('https') || url.includes('http')) {
      return url;
    }
    if (
      !(url.includes('.com') || url.includes('.net') || url.includes('org'))
    ) {
      return undefined;
    }
    return 'https://' + url;
  };
  const website =
    provider.website && provider.website != 'n/a'
      ? sanitizeURL(provider.website)
      : undefined;
  return (
    <div className="provider-contact">
      {title ? <h3>Contact {title}</h3> : ''}
      <Address provider={provider} />
      {provider.phone && (
        <a href={`tel:+${provider.phone}`} className="provider-phone phone">
          <PhoneFilled /> {provider.phone}
        </a>
      )}
      {provider.email && (
        <a href={`mailto:${provider.email}`} className="provider-email">
          <MailOutlined /> {provider.email}
        </a>
      )}
      {provider.website && (
        <a href={website}>
          <GlobalOutlined /> {website}
        </a>
      )}
    </div>
  );
}

const Address = ({ provider }: { provider: ProviderObject }) => {
  const address_1 = provider.address_1 || '';
  const address_2 = provider.address_2 || '';
  const city = provider.city || '';
  const state = provider.state || '';
  const zip = provider.zip || '';

  return (
    <a
      className="provider-address"
      href={`https://www.google.com/maps/search/${address_1} ${address_2} ${
        city ? city + ',' : ''
      } ${state} ${zip}`}>
      {`${address_1} ${address_2} ${city ? city + ',' : ''} ${state} ${zip}`}
    </a>
  );
};
