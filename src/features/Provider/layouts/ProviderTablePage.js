import ProviderTable from '../components/ProviderTable';
import { useLoaderData } from 'react-router-dom';
import Filters from '../components/Filters';
import { useFilterReducer } from '../utils/filterReducer';
import Search from '../components/Search';

export default function ProviderTablePage() {
  const { providers, services, paymentOptions, certifications } =
    useLoaderData();
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
