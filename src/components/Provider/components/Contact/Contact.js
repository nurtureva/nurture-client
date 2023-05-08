import { GlobalOutlined, MailOutlined, PhoneFilled } from '@ant-design/icons';

export default function Contact({ provider }) {
  const sanitizeURL = (url) => {
    if (url.includes('https') || url.includes('http')) {
      return url;
    }
    if (
      !(url.includes('.com') || url.includes('.net') || url.includes('org'))
    ) {
      return null;
    }
    return 'https://' + url;
  };
  const website =
    provider.website && provider.website != 'n/a'
      ? sanitizeURL(provider.website)
      : null;
  return (
    <div className="provider-contact">
      <Address provider={provider} />
      {provider.phone && (
        <div className="phone">
          <a href={`tel:+${provider.phone}`} className="provider-phone">
            <PhoneFilled />
          </a>
        </div>
      )}
      {provider.email && (
        <div className="email">
          <a href={`mailto:${provider.email}`} className="provider-email">
            <MailOutlined />
          </a>
        </div>
      )}
      {provider.website && (
        <div className="website">
          <a href={website}>
            <GlobalOutlined /> {website}
          </a>
        </div>
      )}
    </div>
  );
}

const Address = ({ provider }) => {
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
