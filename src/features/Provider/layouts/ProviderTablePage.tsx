import { useLoaderData } from 'react-router-dom';
import { Option, ProviderObject } from '@/types';
import { ProviderTable } from '../components/ProviderTable';
import { Filters } from '../components/Filters';
import { Search } from '../components/Search';
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
      <div className="bg-tan">
        <Search updateSearch={updateSearch} />
      </div>
      {/* <div className="results-description">
        <h2>Doulas</h2>
        <p>
          Doulas are professionally trained birth coaches who support and
          advocate for expecting parents. Many pregnant people, especially those
          giving birth for the first time, choose to hire a birth doula, who
          offers prenatal education and emotional support, and advocates for the
          pregnant parent.
        </p>
        <h4>Different services that doulas provide:</h4>
        <div>
          <span>
            <h4>type</h4>
            <p>description</p>
          </span>
          <span>
            <h4>type</h4>
            <p>description</p>
          </span>
          <span>
            <h4>type</h4>
            <p>description</p>
          </span>
        </div>
      </div> */}
      <div className="results-page">
        <Filters updateFilters={updateFilters} options={filterOptions} />
        <ProviderTable providers={filteredProviders} />
      </div>
    </>
  );
}
