import { useState } from 'react';
import { Input, Button } from '@/components';

export const Search = ({ updateSearch }: { updateSearch?: Function }) => {
  const [keyword, setKeyword] = useState('');
  const [distance, setDistance] = useState('');
  const searchFunction = (keyword: string, distance: string) => {
    if (updateSearch) updateSearch(keyword, distance);
  };
  return (
    <div className="provider-search">
      <Input
        icon="search"
        label="Keyword, type of care, practitioner name"
        onFocus={() => {
          setKeyword('');
          searchFunction('', distance);
        }}
        placeholder="keyword"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      <p>near</p>
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
        icon="search"
        onClick={() => {
          searchFunction(keyword, distance);
        }}>
        {/* {type === 'verbose' ? 'Find care providers' : ''} */}
      </Button>
    </div>
  );
};

//search either navigates to results page with an optional history object, or updates
