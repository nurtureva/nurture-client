import ProviderTable from '../../components/Provider/layouts/ProviderTable';
import { useOutletContext } from 'react-router-dom';
import Filters from '../../components/Provider/components/Filters/Filters';

export default function Results() {
  const {
    filteredProviders: providers,
    updateFilters,
    filterOptions
  } = useOutletContext();

  return (
    <div className="results-page">
      <Filters options={filterOptions} updateFilters={updateFilters} />
      <ProviderTable providers={providers} />
    </div>
  );
}
