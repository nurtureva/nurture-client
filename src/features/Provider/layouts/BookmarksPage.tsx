import { useLoaderData } from 'react-router-dom';
import { Option, OrganizationObject, ProviderObject } from '@/types';
import { ProviderTable } from '../components/ProviderTable';
import { useFilterReducer } from '../utils/filterReducer';
import { useState } from 'react';

type ProviderType = 'individual' | 'organization';

export default function BookmarksPage() {
  const { providers, organizations } = useLoaderData() as {
    providers: ProviderObject[];
    organizations: OrganizationObject[];
  };
  const [providerType] = useState<ProviderType>('individual');

  const { filteredProviders } = useFilterReducer(
    providerType === 'individual' ? providers : organizations
  );

  return (
    <>
      <section>
        <h1>My Bookmarks</h1>
        <p>
          Here you can find all of your bookmarked providers. These bookmarks
          will remain here as long as you are using the same browser. Clearing
          the cookies on your browser will remove your bookmarks. You can print
          this list, download it, or email it to yourself for safe keeping any
          time you want. Or, head back to the Find Care page to continue
          searching the directory.
        </p>
      </section>
      <section className="results-page">
        <ProviderTable
          providerType={providerType}
          providers={filteredProviders}
        />
      </section>
    </>
  );
}
