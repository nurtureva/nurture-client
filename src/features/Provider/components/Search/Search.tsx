import { useState } from 'react';
import { toggleFilterMenu } from '@/utils/helpers';

export default function Search({
  updateSearch,
  type
}: {
  updateSearch: Function;
  type?: string;
}) {
  const [keywordTerm, setKeywordTerm] = useState('');
  const [distanceTerm, setDistanceTerm] = useState('');

  return (
    <div className="search-container">
      <div className="provider-search">
        <input
          onFocus={() => {
            setKeywordTerm('');
            updateSearch('', distanceTerm);
          }}
          placeholder="keyword"
          value={keywordTerm}
          onChange={(e) => {
            setKeywordTerm(e.target.value);
          }}></input>
        {type === 'verbose' ? '' : <p>near </p>}
        <input
          placeholder="zip code"
          onChange={(e) => {
            setDistanceTerm(e.target.value);
          }}></input>
        <button
          className="primary-button"
          onClick={() => {
            updateSearch(keywordTerm, distanceTerm);
          }}>
          <i className="icon-search" />

          {type === 'verbose' ? 'Find care providers' : ''}
        </button>
      </div>
      <button className="filter-toggle" onClick={toggleFilterMenu}>
        filters
      </button>
    </div>
  );
}
