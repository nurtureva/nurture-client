import { useEffect, useState } from 'react';
import { ZipCode, getClosestZipCodes } from '../../../utils/api';
import { useNavigation } from 'react-router-dom';
import { FiltersContainerObject, Option, ProviderObject } from '../types';

export const useFilters = (
  providers: ProviderObject[],
  filters: FiltersContainerObject
) => {
  const [zipArray, setZipArray] = useState<string[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    if (filters.searchTerm.distance) {
      (async () => {
        const closestZipCodes = await getClosestZipCodes(
          filters.searchTerm.distance
        );
        const zipCodeArray =
          typeof closestZipCodes !== 'string'
            ? closestZipCodes.map((result) => {
                return result.zip_code;
              })
            : [];
        setZipArray(zipCodeArray);
      })();
    }
  }, [filters]);

  const filterProviders = (
    providers: ProviderObject[],
    { searchTerm }: FiltersContainerObject
  ) => {
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
      if (searchTerm.distance) {
        zipCheck = provider.zip ? zipArray.includes(provider.zip) : false;
        console.log(zipCheck);
      }

      if (searchTerm.keyword) {
        const providerName = provider.name;

        if (!providerName) nameCheck = false;
        else
          nameCheck = providerName.toLowerCase().includes(searchTerm.keyword);
      }

      const checkMultiple = (
        activeFilters: string[],
        providerValues: Option[]
      ) => {
        let evaluator = false;
        for (const value of providerValues) {
          for (const option of activeFilters) {
            evaluator = value.id.toString() == option;
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
        console.log(filters.filters.services, provider.services);
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
