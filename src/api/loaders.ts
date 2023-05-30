import { mergeLocalStorage } from '@/utils/helpers';
import { useApi } from './api-hook';
import { LoaderFunctionArgs } from 'react-router-dom';

export const useOptionsLoader = async () => {
  const services = await useApi('GET', 'services')();
  const paymentOptions = await useApi('GET', 'payment-options')();
  const certifications = await useApi('GET', 'certifications')();

  return { services, certifications, paymentOptions };
};

export const useMainPageLoader = async () => {
  const providers = await useApi('GET', 'providers')();
  mergeLocalStorage(providers);
  const options = await useOptionsLoader();

  return { providers, ...options };
};

export const useAdminLoader = async () => {
  const mainPageLoader = await useMainPageLoader();
  const pendingProviders = await useApi('GET', 'providers?isPending=true')();
  const reports = await useApi('GET', 'admin/reports')();

  return { ...mainPageLoader, pendingProviders, reports };
};

export const useProviderLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;
  const provider = await useApi('GET', 'providers')({ id: Number(userId) });
  mergeLocalStorage(provider);
  return { provider };
};

export const useEditFormLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;

  const options = await useOptionsLoader();
  const provider = await useApi('GET', 'providers')({ id: Number(userId) });

  return { provider, ...options };
};
