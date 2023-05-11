import { useEffect, useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useFilterReducer } from '../../utils/filterReducer';
import { toggleFilterMenu } from '../../utils/utils';

export default function ResultsLayout() {
  const { providers, services, paymentOptions, certifications } =
    useLoaderData();
  const filterOptions = { services, paymentOptions, certifications };
  const { updateSearch, updateFilters, filteredProviders } =
    useFilterReducer(providers);

  return (
    <div className="content-container">
      <Search updateSearch={updateSearch} />
      <Outlet context={{ filteredProviders, updateFilters, filterOptions }} />
    </div>
  );
}

const Search = ({ updateSearch }) => {
  const [keywordTerm, setKeywordTerm] = useState();
  const [distanceTerm, setDistanceTerm] = useState();

  return (
    <div className="search-container">
      <div className="provider-search">
        <input
          placeholder="keyword"
          onChange={(e) => {
            setKeywordTerm(e.target.value);
          }}></input>
        <p>near </p>
        <input
          placeholder="zip code"
          onChange={(e) => {
            setDistanceTerm(e.target.value);
          }}></input>
        <button
          onClick={() => {
            updateSearch(keywordTerm, distanceTerm);
          }}>
          search
        </button>
      </div>
      <button className="filter-toggle" onClick={toggleFilterMenu}>
        filters
      </button>
    </div>
  );
};
