import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useFilterReducer } from '../../utils/filterReducer';

export default function ResultsLayout() {
  const providers = useLoaderData();
  const { updateSearch, updateFilters, filteredProviders } =
    useFilterReducer(providers);
  return (
    <div className="content-container">
      <Search updateSearch={updateSearch} />

      <Outlet context={{ filteredProviders }} />
    </div>
  );
}

const Search = ({ updateSearch }) => {
  const [keywordTerm, setKeywordTerm] = useState();
  const [distanceTerm, setDistanceTerm] = useState();

  return (
    <div>
      <input
        onChange={(e) => {
          setKeywordTerm(e.target.value);
        }}></input>
      <input
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
  );
};
