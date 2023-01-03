import 'antd/dist/antd.css';
import './App.css';
import ProviderTable from '../ProviderTable/ProviderTable';
import Navigation from '../Navigation/Navigation';
import ActiveFilters from '../ActiveFilters/ActiveFilters';
import Header from '../Header/Header';
import React, { useState, useEffect } from 'react';
//UI components
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function App() {
  const emptyFilters = {
    //pass setfilters to header, then when these filters change
    services: [], //get these filters from table
    paymentOptions: [],
    zipCode: {
      value: '',
      radius: 5
    }
  };
  const emptySearchTerm = {
    name: '',
    zip: '',
    radius: 5
  };
  //filter state
  const [filters, setFilters] = useState(emptyFilters);
  const [searchTerm, setSearchTerm] = useState(emptySearchTerm);
  //data state
  const [providers, setProviders] = useState([]);
  const [visibleProviders, setVisibleProviders] = useState([]);
  const [templateProvider, setTemplateProvider] = useState();
  //visual state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getProviders = async () => {
    const providers = await fetch(
      `${process.env.REACT_APP_BASE_URL}/providers`,
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return providers.json();
  };

  const getClosestZipCodes = async () => {
    const { zip, radius } = searchTerm;
    let result;
    try {
      result = await fetch(
        `${process.env.REACT_APP_BASE_URL}/zip-codes?value=${zip}&radius=${radius}`
      );
    } catch (err) {
      result = '';
    }

    return result.json();
  };

  /**
   * this runs on initial load.
   * Basically just setting all providers in state, and either changing view state to error or turning off loading (initial state)
   */
  useEffect(async () => {
    try {
      const res = await getProviders();
      setProviders(res);
      setVisibleProviders(res);
    } catch (err) {
      console.log(err);
      setError(true);
    }
    setIsLoading(false);
  }, []);

  /**
   * This is a function to remove a single filter from the filter object in state.
   * If filterType is 'all' it clears all filters
   *
   * @param {String} filterType the type of filter to be removed (i.e. 'service').
   * If the value of this is 'all' it will clear all filters
   * @param {String} filterName the name of the specific filter to be removed (i.e 'Lactation Support')
   */
  const removeFilter = (filterType, filterName) => {
    if (filterType === 'all') {
      setFilters(emptyFilters);
      return;
    }

    let newFilters = { ...filters };

    newFilters[filterType] = newFilters[filterType].filter((param) => {
      return param.name !== filterName;
    });

    setFilters(newFilters);
  };

  const updateSearch = (newSearchType, newValue) => {
    const newSearchTerm = { ...searchTerm };
    newSearchTerm[newSearchType] = newValue;

    setSearchTerm(newSearchTerm);
    //make this function to use setSearchTerm
  };

  const clearSearch = () => {
    setSearchTerm(emptySearchTerm);
  };

  /**
   * This function adds filters to the existing filter object.
   * The only time we want this to remove a filter element is if it's being replaced.
   * i.e. if a _different_ service is being added (currently filtering by 'Doula Services', but then it gets switched to 'Lactation Support')
   *
   *
   * @param {Object} filterObject new filters to be added to the filter object
   */
  const updateFilters = (filterObject) => {
    setFilters({ ...filters, ...filterObject });
  };

  useEffect(async () => {
    //any time a filter changes, we start with all providers.
    let newProviders = [...providers];
    const closestZipCodes = searchTerm.zip ? await getClosestZipCodes() : '';
    console.log(closestZipCodes, searchTerm);
    const zipCodeArray = closestZipCodes
      ? closestZipCodes.zip_codes.map((result) => {
          return result.zip_code;
        })
      : '';

    newProviders = newProviders.filter((provider) => {
      //filters, providers,

      let zipCheck = true;
      let serviceCheck = true;
      let paymentCheck = true;
      let nameCheck = true;
      if (searchTerm.zip) {
        zipCheck = provider.zip ? zipCodeArray.includes(provider.zip) : false;
      }

      if (searchTerm.name) {
        const providerName = provider.name;

        if (!providerName) nameCheck = false;
        else nameCheck = providerName.toLowerCase().includes(searchTerm.name);
      }

      /**
       * This function goes through an array of services or paymentOptions that one provider has.
       * i.e. [{name: 'Doula Support', id: 1}]
       * it then goes through the active filters that the user is trying to filter providers by.
       * If the provider has at least all the elements in the filter array then return true.
       * @example
       * checkMultiple([{name: 'Doula Support', id: 1}], [{name: 'Doula Support', id: 1}, {name: 'Other', id: 4}])
       * returns true
       * checkMultiple([{name: 'Doula Support', id: 1}], [{name: 'Other', id: 4}])
       * returns false
       *
       *
       * @param {Array.<{name: String, id: Number}>} activeFilters this will either be a list of services or payment options (or another filter type in the future)
       * @param {Array.<{name: String, id: Number}>} providerValues this is a list of services or payment options that a given provider offers
       * @returns {Boolean} a boolean value, basically validating the particular provider for the filter
       */
      const checkMultiple = (activeFilters, providerValues) => {
        let evaluator = false;
        for (const value of providerValues) {
          for (const option of activeFilters) {
            //I think this should be changed to id from named
            evaluator = value.id === option.id;
            if (evaluator) {
              //remove filter from the activeFilters search array since we found it
              const index = activeFilters.indexOf(option);
              activeFilters.splice(index, 1);
              //then if there are no more services to look for, break out of the loop
              if (!activeFilters.length) break;
              //otherwise set serviceCheck to false to keep looking
              evaluator = false;
            }
          }
          if (evaluator) break;
        }
        return evaluator;
      };

      if (filters.services.length) {
        serviceCheck = checkMultiple([...filters.services], provider.services);
      }

      if (filters.paymentOptions.length) {
        paymentCheck = checkMultiple(
          [...filters.paymentOptions],
          provider.paymentOptions
        );
      }
      return zipCheck && serviceCheck && paymentCheck && nameCheck;
    });
    setVisibleProviders(newProviders);
  }, [filters, searchTerm]);

  const render = () => {
    if (error) {
      return <p>There was an error please try again...</p>;
    }
    const antIcon = <LoadingOutlined spin />;
    return isLoading ? (
      <Spin indicator={antIcon} />
    ) : (
      <div className="nurture-directory-main-container">
        <Header template={templateProvider} />
        <Navigation
          updateFilters={updateFilters}
          updateSearch={updateSearch}
          clearSearch={clearSearch}
          searchTerm={searchTerm}
        />
        {/* <ActiveFilters
          searchTerm={searchTerm}
          filters={filters}
          setSearch={setSearchTerm}
          removeFilter={removeFilter}
        /> */}

        <ProviderTable providers={visibleProviders} />
      </div>
    );
  };

  return render();
}
