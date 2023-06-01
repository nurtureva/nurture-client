import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import { FiltersContainerObject, Option, ProviderObject } from '../types';
import { accessDatabase } from '@/api';

const checkMultiple = (activeFilters: string[], providerValues: Option[]) => {
  let evaluator = false;
  for (const value of providerValues) {
    for (const option of activeFilters) {
      evaluator = value.id.toString() === option;
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

export const useFilters = (
  providers: ProviderObject[],
  filters: FiltersContainerObject
) => {
  const [zipArray, setZipArray] = useState<string[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      if (filters.searchTerm.distance) {
        const closestZipCodes = await accessDatabase('GET', 'zip-codes', {
          params: { value: filters.searchTerm.distance, radius: 5 }
        });
        const zipCodeArray =
          typeof closestZipCodes !== 'string'
            ? closestZipCodes.map((result) => {
                return result.zip_code;
              })
            : [];
        setZipArray(zipCodeArray);
      }
    })();
  }, [filters]);

  const filterProviders = (
    providers: ProviderObject[],
    { searchTerm }: FiltersContainerObject
  ) => {
    //any time a filter changes, we start with all providers.
    let newProviders = [...providers];
    // const closestZipCodes = searchTerm.distance
    //   ? getClosestZipCodes(searchTerm.distance)
    //   : '';
    // const zipCodeArray = closestZipCodes
    //   ? closestZipCodes?.zip_codes.map((result) => {
    //       return result.zip_code;
    //     })
    //   : '';
    newProviders = newProviders.filter((provider) => {
      //filters, providers,

      let zipCheck = true;
      let serviceCheck = true;
      let paymentCheck = true;
      let nameCheck = true;
      let bookmarkCheck = true;
      if (searchTerm.distance) {
        zipCheck = provider.zip ? zipArray.includes(provider.zip) : false;
      }
      if (searchTerm.keyword) {
        const providerName = provider.name;

        if (!providerName) nameCheck = false;
        else
          nameCheck = providerName.toLowerCase().includes(searchTerm.keyword);
      }
      if (filters.filters?.services?.length && provider.services) {
        serviceCheck = checkMultiple(
          [...filters.filters.services],
          provider.services
        );
      }
      if (filters.filters?.paymentOptions?.length && provider.paymentOptions) {
        paymentCheck = checkMultiple(
          [...filters.filters.paymentOptions],
          provider.paymentOptions
        );
      }
      if (filters.filters?.bookmarkFilter) {
        bookmarkCheck = provider.isBookmarked;
      }
      return (
        zipCheck && serviceCheck && paymentCheck && nameCheck && bookmarkCheck
      );
    });
    return newProviders;
  };

  return filterProviders(providers, filters);
};
