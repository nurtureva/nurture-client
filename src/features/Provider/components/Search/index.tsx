import { useState } from 'react';
import { toggleFilterMenu } from '../../../../utils/helpers';

export default function Search({ updateSearch }: { updateSearch: Function }) {
  const [keywordTerm, setKeywordTerm] = useState('');
  const [distanceTerm, setDistanceTerm] = useState('');

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
}
