import { useReducer } from 'react';
import { useFilters } from './filterProviders';
import {
  FilterObject,
  FiltersContainerObject,
  ProviderObject,
  ReducerAction
} from '../types';
const reducer = (state: FiltersContainerObject, action: ReducerAction) => {
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
const initialState: FiltersContainerObject = {
  searchTerm: {
    keyword: '',
    distance: ''
  },
  filters: { services: [], paymentOptions: [] }
};

export const useFilterReducer = (providers: ProviderObject[]) => {
  const [state, dispatch]: [FiltersContainerObject, any] = useReducer(
    reducer,
    initialState
  );

  const updateSearch = (
    keywordSearch: string | undefined,
    distanceSearch: string | undefined
  ) => {
    const newSearchTerm = { keywordSearch, distanceSearch };
    if (keywordSearch || distanceSearch) {
      newSearchTerm.keywordSearch = keywordSearch;
    }
    if (!keywordSearch) delete newSearchTerm.keywordSearch;
    if (!distanceSearch) delete newSearchTerm.distanceSearch;
    dispatch({ type: 'UPDATE_SEARCH', newSearchTerm });
  };
  const updateFilters = (filters: FilterObject) => {
    dispatch({ type: 'UPDATE_FILTERS', filters });
  };
  return {
    updateSearch,
    updateFilters,
    filteredProviders: useFilters(providers, state)
  };
};
