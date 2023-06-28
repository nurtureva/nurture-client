import qs from 'qs';
import { useSearchParams } from 'react-router-dom';

export const useSearchCriteria = (): {
  searchCriteria?;
  setFilters?;
  setSearchTerm?;
} => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const searchCriteria = qs.parse(searchParams.toString(), {
    comma: true
  });

  const setFilters = (filters) => {
    const newSearchCriteria = { ...searchCriteria };
    newSearchCriteria.filters = filters;

    setSearchParams(qs.stringify(newSearchCriteria));
  };
  const setSearchTerm = (searchTerm) => {
    const newSearchCriteria = { ...searchCriteria };
    newSearchCriteria.searchTerm = { ...searchTerm };
    console.log(qs.stringify(newSearchCriteria, { encode: false }));
    setSearchParams(qs.stringify(newSearchCriteria, { encode: false }));
  };

  return { searchCriteria, setFilters, setSearchTerm };
};
