import { Link } from 'react-router-dom';
import Name from '../Name';
import Contact from '../Contact';
import { ProviderObject } from '@/types';
import Bookmark from '../Bookmark';

export default function ProviderTable({
  providers
}: {
  providers: ProviderObject[];
}) {
  const renderProviders = () => {
    return providers.map((provider) => {
      if (provider.name) {
        return <Provider provider={provider} key={provider.id} />;
      }
    });
  };

  const renderNoProviders = () => {
    return <div className="no-results-found">No results found...</div>;
  };

  return (
    <>
      <div className="provider-table-container">
        <h2>Showing all Doulas</h2>
        <h3>
          {providers.length === 1
            ? '1 provider'
            : `${providers.length} providers`}
        </h3>
        {providers.length ? renderProviders() : renderNoProviders()}
      </div>
    </>
  );
}

const Provider = ({ provider }: { provider: ProviderObject }) => {
  return (
    <div>
      <Link to={`/results/${provider.id}`}>
        <Name provider={provider} />
      </Link>
      <Bookmark provider={provider} />
      <Contact provider={provider} />
    </div>
  );
};