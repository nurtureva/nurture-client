import { LoaderFunctionArgs } from 'react-router-dom';
import { ZipCode, Option, ProviderObject, Reports } from '@/types';
import { mergeLocalStorage } from './helpers';

export type OptionEndpoint = 'services' | 'certifications' | 'payment-options';
type ProviderEndpoint = `providers/${string}`;
type ProvidersEndpoint = `providers${string}`;
type ReportsEndpoint = 'admin/reports';
export type EndpointType =
  | OptionEndpoint
  | ProviderEndpoint
  | ProvidersEndpoint
  | ReportsEndpoint;

type GetterFunction = {
  <T extends OptionEndpoint>(endpoint: T): Promise<Option[]>;
  <T extends ProviderEndpoint>(endpoint: T): Promise<ProviderObject>;
  <T extends ProvidersEndpoint>(endpoint: T): Promise<ProviderObject[]>;
  <T extends ReportsEndpoint>(endpoint: T): Promise<Reports[]>;
};

const requestOptions: RequestInit = {
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json'
  }
};

const getFromDb: GetterFunction = async (endpoint: EndpointType) => {
  const data = await fetch(`${import.meta.env.VITE_BASE_URL}/${endpoint}`, {
    ...requestOptions
  });

  return data.json();
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

export const deleteById = async (endpoint: EndpointType, id: number) => {
  const list = await fetch(
    `${import.meta.env.VITE_BASE_URL}/${endpoint}/${id}`,
    {
      method: 'DELETE',
      ...requestOptions
    }
  );
  return list.json();
};

export const addOption = async (
  endpoint: OptionEndpoint,
  name: string
): Promise<number> => {
  const id = await fetch(`${import.meta.env.VITE_BASE_URL}/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify({ newService: { name } }),
    ...requestOptions
  });
  return id.json();
};

export const approveProvider = async (providerId: number) => {
  const result = await fetch(
    `${import.meta.env.VITE_BASE_URL}/providers/${providerId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        patchBody: {
          needs_review: false
        }
      }),
      ...requestOptions
    }
  );
};

export const useOptionsLoader = async () => {
  const services = await getFromDb('services');
  const certifications = await getFromDb('certifications');
  const paymentOptions = await getFromDb('payment-options');

  return { services, certifications, paymentOptions };
};

export const useMainPageLoader = async () => {
  const providers = await getFromDb('providers');
  mergeLocalStorage(providers);
  const options = await useOptionsLoader();

  return { providers, ...options };
};

export const useAdminLoader = async () => {
  const mainPageLoader = await useMainPageLoader();
  const pendingProviders = await getFromDb('providers?isPending=true');
  const reports = await getFromDb('admin/reports');

  return { ...mainPageLoader, pendingProviders, reports };
};

export const useProviderLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;

  const provider = await getFromDb(`providers/${userId}`);
  mergeLocalStorage(provider);
  return { provider };
};
