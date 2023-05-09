import ProviderTable from '../../components/Provider/layouts/ProviderTable';
import { useOutletContext } from 'react-router-dom';

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

const Filters = ({ options }) => {
  const { services, paymentOptions, certifications } = options;

  return (
    <div className="provider-filters">
      <h4>Filters</h4>
      <FilterList optionList={services} />
      <FilterList optionList={paymentOptions} />
      <button>clear filters</button>
    </div>
  );
};

const FilterList = ({ optionList }) => {
  return (
    <div>
      <label>Type of care:</label>
      <ul>
        {optionList.map((choice) => {
          return (
            <li>
              <label>
                <input type="checkbox" value={choice.id} />
                {choice.name}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
