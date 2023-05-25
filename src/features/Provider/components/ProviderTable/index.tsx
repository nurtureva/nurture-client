import { Link } from 'react-router-dom';
import Name from '../Name';
import Contact from '../Contact';
import { ProviderObject } from '../../types';
import { useEffect, useState } from 'react';

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
  const [isBookmarked, setIsBookmarked] = useState(!!provider.isBookmarked);
  useEffect(() => {
    const stringifiedBookmarkedProviders = window.localStorage.getItem(
      'bookmarked-providers'
    );
    const bookmarkedProviders: number[] = stringifiedBookmarkedProviders
      ? JSON.parse(stringifiedBookmarkedProviders)
      : [];
    const alreadyBookmared = bookmarkedProviders.includes(provider.id);

    if (isBookmarked && !alreadyBookmared) {
      bookmarkedProviders.push(provider.id);
    } else if (!isBookmarked && alreadyBookmared) {
      const bookmarkIndex = bookmarkedProviders.indexOf(provider.id);
      bookmarkedProviders.splice(bookmarkIndex, 1);
    }

    window.localStorage.setItem(
      'bookmarked-providers',
      JSON.stringify(bookmarkedProviders)
    );
    provider.isBookmarked = isBookmarked;
  }, [isBookmarked]);
  return (
    <div>
      <div className="bookmark">
        <input
          type="checkbox"
          checked={isBookmarked}
          onChange={(e) => {
            setIsBookmarked(e.target.checked);
          }}></input>
      </div>
      <Link to={`/results/${provider.id}`}>
        <Name provider={provider} />
      </Link>

      <Contact provider={provider} />
    </div>
  );
};
