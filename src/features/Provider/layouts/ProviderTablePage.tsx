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
          with doulas, lactation consultants, and mental health care
          professionals in the Richmond, Virginia area. Jump to one of our main
          categories of care, use the search bar to enter a keyword or a
          practitioner’s name, or browse our full directory below.
        </p>
        <p>Jump to:</p>
        <p>
          NOTE: The providers in this directory have not been vetted by Nurture
          RVA. The credentials listed after their names, and their listed
          services, are presented as the individual requested. The information
          provided by the individual has not been verified by Nurture RVA. It is
          imperative that you review and research any vendor you wish to
          contact. When contacting a provider from this list, please indicate
          that you received their name from this breastfeeding resource
          directory.
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
