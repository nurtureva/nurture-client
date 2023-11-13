import { Link } from 'react-router-dom';
import samplePhoto1 from '@/assets/images/profile-1.png';
import samplePhoto2 from '@/assets/images/profile-2.png';
import { ProviderObject } from '@/types';
import { Bookmark } from '../Bookmark';
import { Button } from '@/components/Button/Button';
import { toggleFilterMenu } from '@/utils/helpers';
import { Address } from '../Address';
import { Identity } from '../Identity';
import { Information } from '../Information';

export const ProviderTable = ({
  providers,
  providerType
}: {
  providers: ProviderObject[];
  providerType: string;
}) => {
  const renderProviders = () => {
    return providers.map((provider) => {
      if (provider.name) {
        return (
          <ProviderContainer
            providerType={providerType}
            provider={provider}
            key={provider.id}
          />
        );
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

const ProviderContainer = ({
  provider,
  providerType
}: {
  provider: ProviderObject;
  providerType: string;
}) => {
  const { profile_photo } = provider;
  const photoList = [samplePhoto1, samplePhoto2];
  const buttonProps = { type: 'secondary', size: 'small ' };
  const isMobile = () => window.innerWidth < 700;

  const photoSrc = profile_photo
    ? import.meta.env.VITE_S3_URL + profile_photo
    : photoList[Math.floor(Math.random() * photoList.length)];

  const PhotoContainerWithIdentity = () => {
    return (
      <span>
        <span className="photo-container">
          <img src={photoSrc} />
        </span>
        <span>
          <Identity provider={provider} />
        </span>
      </span>
    );
  };
  return (
    <div>
      <Bookmark provider={provider} />
      <Link
        to={`/${providerType === 'individual' ? 'provider' : providerType}/${
          provider.id
        }`}
        className="provider-container list">
        {isMobile() ? (
          <PhotoContainerWithIdentity />
        ) : (
          <span className="photo-container">
            <img src={photoSrc} />
          </span>
        )}
        <span>
          {isMobile() ? '' : <Identity provider={provider} />}
          <Information provider={provider} />
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
      </Link>
    </div>
  );
};
