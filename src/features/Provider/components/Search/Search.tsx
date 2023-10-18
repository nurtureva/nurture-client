import { useState } from 'react';
import { Input, Button } from '@/components';

export const Search = ({
  updateSearch,
  type = 'standard'
}: {
  updateSearch?: Function;
  type?: 'fancy' | 'standard' | 'compressed';
}) => {
  const [keyword, setKeyword] = useState('');
  const [distance, setDistance] = useState('');
  const searchFunction = (keyword: string, distance: string) => {
    if (updateSearch) updateSearch(keyword, distance);
  };

  const isMobile = () => window.innerWidth < 700;
  if (isMobile()) type = 'standard';
  return (
    <div className={`provider-search ${isMobile() ? 'mobile' : type}`}>
      <Input
        icon="search"
        label={
          type === 'fancy'
            ? undefined
            : 'Keyword, type of care, practitioner name'
        }
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
      {type === 'standard' && !isMobile() ? <p>near</p> : ''}
      <Input
        icon="map"
        label={type === 'fancy' ? undefined : 'Zip code'}
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
        {type !== 'compressed' && !isMobile() ? 'Find care providers' : ''}
      </Button>
    </div>
  );
};

//search either navigates to results page with an optional history object, or updates
