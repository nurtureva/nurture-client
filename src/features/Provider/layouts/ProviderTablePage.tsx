import { useLoaderData } from 'react-router-dom';
import { Option, ProviderObject } from '@/types';
import ProviderTable from '../components/ProviderTable';
import Filters from '../components/Filters';
import Search from '../components/Search';
import { useFilterReducer } from '../utils/filterReducer';

export default function ProviderTablePage() {
  const { providers, services, paymentOptions, certifications } =
    useLoaderData() as {
      providers: ProviderObject[];
      services: Option[];
      paymentOptions: Option[];
      certifications: Option[];
    };
  const filterOptions = { services, paymentOptions, certifications };
  const { updateSearch, updateFilters, filteredProviders } =
    useFilterReducer(providers);

  return (
    <>
      <Search updateSearch={updateSearch} />
      <div className="results-page">
        <Filters options={filterOptions} updateFilters={updateFilters} />
        <ProviderTable providers={filteredProviders} />
      </div>
    </>
  );
}
