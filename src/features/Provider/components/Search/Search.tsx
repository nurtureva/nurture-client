import { useState } from 'react';
import { Button } from '@/components/Button/Button';

export default function Search({ type, updateSearch }: { type?: string }) {
  const [keyword, setKeyword] = useState('');
  const [distance, setDistance] = useState('');

  return (
    <div className="search-container">
      <div className="provider-search">
        <input
          onFocus={() => {
            setKeyword('');
            updateSearch('', distance);
          }}
          placeholder="keyword"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}></input>
        {type === 'verbose' ? '' : <p>near </p>}
        <input
          placeholder="zip code"
          onChange={(e) => {
            setDistance(e.target.value);
          }}></input>
        <Button
          type="primary"
          search
          onClick={() => {
            console.log({ keyword, distance });
            updateSearch(keyword, distance);
          }}>
          {type === 'verbose' ? 'Find care providers' : ''}
        </Button>
      </div>
    </div>
  );
}

//search either navigates to results page with an optional history object, or updates
