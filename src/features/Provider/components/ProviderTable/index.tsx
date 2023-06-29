import { Link } from 'react-router-dom';
import Name from '../Name';
import samplePhoto1 from '@/assets/profile-1.png';
import samplePhoto2 from '@/assets/profile-2.png';
import Contact from '../Contact';
import './provider.scss';
import { ProviderObject } from '@/types';
import Bookmark from '../Bookmark';
import { Button } from '@/components/Button/Button';
import { toggleFilterMenu } from '@/utils/helpers';

export default function ProviderTable({
  providers
}: {
  providers: ProviderObject[];
}) {
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
          <h2>Showing all Doulas</h2>
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
}

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
      <div className="provider-button-group">
        <Button type="primary">View Profile</Button>
        <span>
          <Button type="secondary" icon="call" />
          <Button type="secondary" icon="email" />
          <Button type="secondary" icon="web" />
          <Button type="secondary" icon="map" />
        </span>
      </div>
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
