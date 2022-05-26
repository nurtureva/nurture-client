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

function App() {
  const emptyFilters = {
    //pass setfilters to header, then when these filters change
    services: [], //get these filters from table (maybe make new column section for available filters)
    paymentOptions: [],
    zipCode: {
      value: '',
      radius: 5
    }
  };
  //filter state
  const [filters, setFilters] = useState(emptyFilters);
  const [searchTerm, setSearchTerm] = useState('');
  //data state
  const [providers, setProviders] = useState([]);
  const [visibleProviders, setVisibleProviders] = useState([]);
  const [templateProvider, setTemplateProvider] = useState();
  //visual state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getProviders() {
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
  }

  const removeFilter = (filterType, filterName) => {
    if (filterType === 'all') {
      setFilters(emptyFilters);
      return;
    }

    let newFilters = { ...filters };

    newFilters[filterType] = newFilters[filterType].filter((param) => {
      return param !== filterName;
    });

    setFilters(newFilters);
  };

  const updateFilters = (filterArray) => {
    setFilters({ ...filters, ...filterArray });
  };

  const zipSearch = async () => {
    const { value, radius } = filters.zipCode;
    let result;
    try {
      result = await fetch(
        `${process.env.REACT_APP_BASE_URL}/zip-codes?value=${value}&radius=${radius}`
      );
    } catch (err) {
      result = '';
    }

    return result.json();
  };

  useEffect(async () => {
    let newProviders = [...providers];
    const closestZipCodes = filters.zipCode.value ? await zipSearch() : '';
    const acceptableZipCodes = closestZipCodes
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

      if (acceptableZipCodes.length) {
        zipCheck = provider.contact['Zip Code']
          ? acceptableZipCodes.includes(provider.contact['Zip Code'])
          : false;
      }

      if (searchTerm.name) {
        const providerName = provider.contact['Name'];

        if (!providerName) nameCheck = false;
        else nameCheck = providerName.toLowerCase().includes(searchTerm.name);
      }

      const checkMultiple = (activeFilters, providerValues) => {
        let evaluator = false;
        for (const value of providerValues) {
          for (const option of activeFilters) {
            evaluator = value.includes(option);
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
        serviceCheck = checkMultiple(
          [...filters.services],
          Object.values(provider.services)
        );
      }

      if (filters.paymentOptions.length) {
        paymentCheck = checkMultiple(
          [...filters.paymentOptions],
          Object.values(provider.paymentOptions)
        );
      }
      return zipCheck && serviceCheck && paymentCheck && nameCheck;
    });
    setVisibleProviders(newProviders);
  }, [filters, searchTerm]);

  useEffect(async () => {
    try {
      const res = await getProviders();
      let templateProvider = res.shift(); //actually the headers for the providers table
      //"empty" out the first template provider to keep the formatting
      for (const key in templateProvider) {
        const category = templateProvider[key];
        for (const item in category) {
          category[item] = '';
        }
      }

      setTemplateProvider(templateProvider);
      setProviders(res);
      setVisibleProviders(res);
    } catch (err) {
      console.log(err);
      setError(true);
    }
    setIsLoading(false);
  }, []);

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
          setSearchTerm={setSearchTerm}
          filters={filters}
        />
        <ActiveFilters
          searchTerm={searchTerm}
          filters={filters}
          setSearch={setSearchTerm}
          removeFilter={removeFilter}
        />

        <ProviderTable providers={visibleProviders} />
      </div>
    );
  };

  return render();
}

export default App;

/**
 * leveraged form data to create a workable and readable spreadsheet
 * added features to spreadsheet to make working with it easier:
 *        - highlight row if needs review
 *        - if any visibility column is not empty then don't share provider data
 * create server to interact with spreadsheet:
 *        - read all data from spreadsheet
 *        - organize and trim data to be usable for programming
 *        - create endpoints to add new provider data and comments
 *
 */
