import { LoaderFunctionArgs } from 'react-router-dom';
import { ZipCode, Option, ProviderObject } from '../types';
import { getBookmarkedProviders, mergeIsBookmarked } from './helpers';

type OptionEndpoint = 'services' | 'certifications' | 'payment-options';
type ProviderEndpoint = `providers/${string}`;
type ProvidersEndpoint = 'providers';
type EndpointType = OptionEndpoint | ProviderEndpoint | ProvidersEndpoint;

type GetterFunction = {
  <T extends OptionEndpoint>(endpoint: T): Promise<Option[]>;
  <T extends ProviderEndpoint>(endpoint: T): Promise<ProviderObject>;
  <T extends ProvidersEndpoint>(endpoint: T): Promise<ProviderObject[]>;
};

const getFromDb: GetterFunction = async (endpoint: EndpointType) => {
  const data = await fetch(`${import.meta.env.VITE_BASE_URL}/${endpoint}`, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return data.json();
};

export const useOptionsLoader = async () => {
  const services = await getFromDb('services');
  const certifications = await getFromDb('certifications');
  const paymentOptions = await getFromDb('payment-options');

  return { services, certifications, paymentOptions };
};

export const useMainPageLoader = async () => {
  const providers = await getFromDb('providers');
  mergeIsBookmarked(providers);
  const options = await useOptionsLoader();

  return { providers, ...options };
};

export const useProviderLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;

  const provider = await getFromDb(`providers/${userId}`);
  mergeIsBookmarked(provider);
  return { provider };
};

export const getClosestZipCodes = async (
  searchTerm: string | undefined
): Promise<ZipCode[] | string> => {
  try {
    const result = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/zip-codes?value=${searchTerm}&radius=${5}`
    );

    return result.json();
  } catch (err) {
    return 'probably too many requests';
  }
};
