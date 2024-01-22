import { useLoaderData } from 'react-router-dom';
import { Option, OrganizationObject, ProviderObject } from '@/types';
import { ProviderTable } from '../components/ProviderTable';
import { Filters } from '../components/Filters';
import { Search } from '../components/Search';
import { useFilterReducer } from '../utils/filterReducer';
import { useState } from 'react';

type ProviderType = 'individual' | 'organization';

export default function ProviderTablePage() {
  const { providers, organizations, services, paymentOptions, certifications } =
    useLoaderData() as {
      providers: ProviderObject[];
      organizations: OrganizationObject[];
      services: Option[];
      paymentOptions: Option[];
      certifications: Option[];
    };
  const [providerType, setProviderType] = useState<ProviderType>('individual');
  const filterOptions = { services, paymentOptions, certifications };
  const { updateSearch, updateFilters, initialSearch, filteredProviders } =
    useFilterReducer(providerType === 'individual' ? providers : organizations);

  return (
    <>
      <section>
        <h1>Find Care</h1>
        <p>
          The Birth and Early Parenting Resource Directory will help connect you
          with doulas, lactation support providers, and mental health care
          professionals in the Richmond, Virginia area. Jump to one of our main
          categories of care, use the search bar to enter a keyword or a
          practitioner’s name, or browse our full directory below.
        </p>
        <p>
          <strong>Disclaimer:</strong> Individuals and organizations listed in
          this directory are for informational purposes only. Nurture does not
          endorse or guarantee the quality of services of any of these
          individuals or organizations. While we do our best to keep information
          updated, there may have been changes since this information was
          posted. Always contact the providers to verify all information before
          making appointments or using services to ensure that you receive
          services and support appropriate for your needs. <div></div>
          <div></div>When contacting a provider from this list, please indicate
          that you received their name from this directory.
        </p>
      </section>
      <div className="bg-tan">
        <Search updateSearch={updateSearch} initialTerms={initialSearch} />
      </div>
      <div className="results-page">
        <Filters
          updateFilters={updateFilters}
          setProviderType={setProviderType}
          providerType={providerType}
          options={filterOptions}
        />
        <ProviderTable
          providerType={providerType}
          providers={filteredProviders}
        />
      </div>
    </>
  );
}
