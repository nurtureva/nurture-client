import { LoaderFunctionArgs } from 'react-router-dom';
import { Option, ProviderObject } from '../features/Provider/types';
import { ZipCode } from '../types';

type GetterFunction<T> = (endpoint: string) => Promise<T>;

const getFromDb: GetterFunction<Option[] | ProviderObject[]> = async (
  endpoint
) => {
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
  const options = await useOptionsLoader();

  return { providers, ...options };
};

export const useProviderLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;

  const provider = await getFromDb(`providers/${userId}`);

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
