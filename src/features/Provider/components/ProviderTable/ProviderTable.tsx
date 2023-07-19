import { Link } from 'react-router-dom';
import samplePhoto1 from '@/assets/images/profile-1.png';
import samplePhoto2 from '@/assets/images/profile-2.png';
import { ProviderObject } from '@/types';
import { Bookmark } from '../Bookmark';
import { Button } from '@/components/Button/Button';
import { toggleFilterMenu } from '@/utils/helpers';

export const ProviderTable = ({
  providers
}: {
  providers: ProviderObject[];
}) => {
  const renderProviders = () => {
    return providers.map((provider) => {
      if (provider.name) {
        return <ProviderContainer provider={provider} key={provider.id} />;
      }
    });
  };

  const renderNoProviders = () => {
    return <div className="no-results-found">No results found...</div>;
  };

  return (
    <>
      <div className="provider-table-container">
        <span>
          <h3>
            {providers.length === 1
              ? '1 provider'
              : `${providers.length} providers`}
          </h3>
          <Button
            type="secondary"
            onClick={toggleFilterMenu}
            className="filter-toggle">
            Filter Results
          </Button>
        </span>
        {providers.length ? renderProviders() : renderNoProviders()}
      </div>
    </>
  );
};

const sanitizeURL = (url: string) => {
  if (url.includes('https') || url.includes('http')) {
    return url;
  }
  if (!(url.includes('.com') || url.includes('.net') || url.includes('org'))) {
    return undefined;
  }
  return 'https://' + url;
};

const ProviderContainer = ({ provider }: { provider: ProviderObject }) => {
  const {
    profile_photo,
    name,
    business_name: businessName,
    services,
    certifications,
    paymentOptions
  } = provider;
  const photoList = [samplePhoto1, samplePhoto2];
  const buttonProps = { type: 'secondary', size: 'small ' };

  const photoSrc = profile_photo
    ? import.meta.env.VITE_S3_URL + profile_photo
    : photoList[Math.floor(Math.random() * photoList.length)];
  return (
    <div>
      <Bookmark provider={provider} />
      <Link to={`/results/${provider.id}`} className="provider-container list">
        <span className="photo-container">
          <img src={photoSrc} />
        </span>
        {/* <div className="provider-details"> */}
        <span className="provider-name">
          <h3>{name}</h3>
          {businessName}
        </span>
        <span>
          <div>
            {services?.length ? (
              <p>
                Type of care:
                {services?.map((service, index) => {
                  const comma = index !== services.length - 1 ? ',' : '';
                  return ` ${service.name}${comma}`;
                })}
              </p>
            ) : (
              ''
            )}
            {certifications?.length ? (
              <p>
                Certifications:
                {certifications?.map((service, index) => {
                  const comma = index !== certifications.length - 1 ? ',' : '';
                  return ` ${service.name}${comma}`;
                })}
              </p>
            ) : (
              ''
            )}
            {paymentOptions?.length ? (
              <p>
                Payment:
                {paymentOptions?.map((service, index) => {
                  const comma = index !== paymentOptions.length - 1 ? ',' : '';
                  return ` ${service.name}${comma}`;
                })}
              </p>
            ) : (
              ''
            )}
          </div>
          <Address provider={provider} />
          <p>
            {provider.phone ? provider.phone : ''}
            {provider.phone && (provider.email || provider.website)
              ? ' | '
              : ''}
            {provider.email ? provider.email : ''}
            {/* {provider.email && provider.website ? ' | ' : ''} */}
            {/* {provider.website ? provider.website : ''} */}
          </p>
        </span>
        {/* </div> */}
      </Link>
      {/* <div className="provider-button-group">
        <Button type="primary" to={`/results/${provider.id}`} size="small">
          View Profile
        </Button>
        <span>
          <Button {...buttonProps} to={`tel:${provider.phone}`} icon="call" />
          <Button
            {...buttonProps}
            to={`mailto:${provider.email}`}
            icon="email"
          />
          {provider.website && (
            <Button
              {...buttonProps}
              to={sanitizeURL(provider.website)}
              icon="web"
            />
          )}
          <Button
            {...buttonProps}
            to={`https://www.google.com/maps/search/${provider.address_1} ${
              provider.address_2
            } ${provider.city ? provider.city + ',' : ''} ${provider.state} ${
              provider.zip
            }`}
            icon="map"
          />
        </span>
      </div> */}
    </div>
  );
};

const Address = ({ provider }: { provider: ProviderObject }) => {
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
