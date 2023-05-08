import { useEffect, useReducer } from 'react';
import { useFilters } from './filterProviders';
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH':
      return {
        ...state,
        searchTerm: action.newSearchTerm
      };
    case 'UPDATE_FILTERS':
      return { ...state, filters: action.filters };
    default:
      return state;
  }
};
const initialState = {
  searchTerm: {
    keyword: '',
    distance: ''
  },
  filters: { services: [], paymentOptions: [] }
};

export const useFilterReducer = (providers) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateSearch = (keywordSearch, distanceSearch) => {
    const newSearchTerm = { keywordSearch, distanceSearch };
    if (keywordSearch || distanceSearch) {
      newSearchTerm.keywordSearch = keywordSearch;
    }
    if (!keywordSearch) delete newSearchTerm.keywordSearch;
    if (!distanceSearch) delete newSearchTerm.distanceSearch;
    dispatch({ type: 'UPDATE_SEARCH', newSearchTerm });
  };
  const updateFilters = (filters) => {
    dispatch({ type: 'UPDATE_FILTERS', filters });
  };
  return {
    updateSearch,
    updateFilters,
    filteredProviders: useFilters(providers, state)
  };
};
