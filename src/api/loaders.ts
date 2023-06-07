import { mergeLocalStorage } from '@/utils/helpers';
import { accessDatabase } from './fetch';
import { LoaderFunctionArgs } from 'react-router-dom';

export const useOptionsLoader = async () => {
  const services = await accessDatabase('GET', 'services');
  const paymentOptions = await accessDatabase('GET', 'payment-options');
  const certifications = await accessDatabase('GET', 'certifications');

  return { services, certifications, paymentOptions };
};

export const useMainPageLoader = async () => {
  const providers = await accessDatabase('GET', 'providers');
  mergeLocalStorage(providers);
  const options = await useOptionsLoader();

  return { providers, ...options };
};

export const useAdminLoader = async () => {
  const mainPageLoader = await useMainPageLoader();
  const pendingProviders = await accessDatabase('GET', 'providers', {
    params: { isPending: true }
  });
  console.log(pendingProviders);

  // const reports = await accessDatabase('GET', 'admin/reports');

  return { ...mainPageLoader, pendingProviders };
};

export const useProviderLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;
  const provider = await accessDatabase('GET', 'providers', {
    id: Number(userId)
  });
  mergeLocalStorage(provider);
  return { provider };
};

export const useEditFormLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;

  const options = await useOptionsLoader();
  const provider = await accessDatabase('GET', 'providers', {
    id: Number(userId)
  });

  return { provider, ...options };
};
