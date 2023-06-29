import { useState } from 'react';
import { Button } from '@/components/Button/Button';
import Input from '@/components/Input';

export default function Search({ type, updateSearch }: { type?: string }) {
  const [keyword, setKeyword] = useState('');
  const [distance, setDistance] = useState('');

  return (
    <div className="search-container">
      <div className="provider-search">
        <Input
          icon="search"
          label="Keyword, type of care, practitioner name"
          onFocus={() => {
            setKeyword('');
            updateSearch('', distance);
          }}
          placeholder="keyword"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        {type === 'verbose' ? '' : <p>near </p>}
        <Input
          icon="map"
          label="Zip code"
          placeholder="zip code"
          onChange={(e) => {
            setDistance(e.target.value);
          }}
        />
        <Button
          type="primary"
          search
          onClick={() => {
            updateSearch(keyword, distance);
          }}>
          {type === 'verbose' ? 'Find care providers' : ''}
        </Button>
      </div>
    </div>
  );
}

//search either navigates to results page with an optional history object, or updates
