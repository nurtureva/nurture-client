import { useEffect, useState } from 'react';
import { getClosestZipCodes } from '../../../utils/api';
import { useNavigation } from 'react-router-dom';

export const useFilters = (providers, filters) => {
  const [zipArray, setZipArray] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    if (filters.searchTerm.distanceSearch) {
      (async () => {
        const closestZipCodes = await getClosestZipCodes(
          filters.searchTerm.distanceSearch
        );
        const zipCodeArray = closestZipCodes.zip_codes.map((result) => {
          return result.zip_code;
        });
        setZipArray(zipCodeArray);
      })();
    }
  }, [filters]);
  /**
   * This function adds filters to the existing filter object.
   * The only time we want this to remove a filter element is if it's being replaced.
   * i.e. if a _different_ service is being added (currently filtering by 'Doula Services', but then it gets switched to 'Lactation Support')
   *
   *
   * @param {Object} filterObject new filters to be added to the filter object
   */
  const filterProviders = (providers, { searchTerm }) => {
    //any time a filter changes, we start with all providers.
    let newProviders = [...providers];
    // const closestZipCodes = searchTerm.distanceSearch
    //   ? getClosestZipCodes(searchTerm.distanceSearch)
    //   : '';
    // const zipCodeArray = closestZipCodes
    //   ? closestZipCodes.zip_codes.map((result) => {
    //       return result.zip_code;
    //     })
    //   : '';
    newProviders = newProviders.filter((provider) => {
      //filters, providers,

      let zipCheck = true;
      let serviceCheck = true;
      let paymentCheck = true;
      let nameCheck = true;
      if (searchTerm.distanceSearch) {
        zipCheck = provider.zip ? zipArray.includes(provider.zip) : false;
        console.log(zipCheck);
      }

      if (searchTerm.keywordSearch) {
        const providerName = provider.name;

        if (!providerName) nameCheck = false;
        else
          nameCheck = providerName
            .toLowerCase()
            .includes(searchTerm.keywordSearch);
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
            evaluator = value.id == option;
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
      if (filters.filters.services.length) {
        serviceCheck = checkMultiple(
          [...filters.filters.services],
          provider.services
        );
      }

      if (filters.filters.paymentOptions.length) {
        paymentCheck = checkMultiple(
          [...filters.filters.paymentOptions],
          provider.paymentOptions
        );
      }
      return zipCheck && serviceCheck && paymentCheck && nameCheck;
    });
    return newProviders;
  };

  return filterProviders(providers, filters);
};
