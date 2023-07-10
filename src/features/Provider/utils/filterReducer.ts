import { useReducer } from 'react';
import { useFilters } from './filterProviders';
import {
  FilterObject,
  FiltersContainerObject,
  ProviderObject,
  ReducerAction
} from '@/types';
import { useLocation } from 'react-router-dom';
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

export const useFilterReducer = (providers: ProviderObject[]) => {
  const initialState: FiltersContainerObject = {
    searchTerm: {
      keyword: '',
      distance: ''
    },
    filters: {
      services: [],
      paymentOptions: [],
      bookmarkFilter: false
    }
  };

  const [state, dispatch]: [FiltersContainerObject, any] = useReducer(
    reducer,
    initialState
  );

  const updateSearch = (
    keyword: string | undefined,
    distance: string | undefined
  ) => {
    const newSearchTerm = { keyword, distance };
    if (keyword || distance) {
      newSearchTerm.keyword = keyword;
    }
    if (!keyword) delete newSearchTerm.keyword;
    if (!distance) delete newSearchTerm.distance;
    dispatch({ type: 'UPDATE_SEARCH', newSearchTerm });
  };
  const updateFilters = (filters: FilterObject) => {
    dispatch({ type: 'UPDATE_FILTERS', filters });
  };

  //this should also return the type of provider page header. Doula/Mental Health/Lactation info, or bookmarks, or general page
  /**
   * service options header –– filters: services in history state
   * bookmark header –– idk
   * general header –– search bar
   */
  return {
    updateSearch,
    updateFilters,
    filteredProviders: useFilters(providers, state)
  };
};
