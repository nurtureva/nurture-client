import { mergeLocalStorage } from '@/utils/helpers';
import { accessDatabase } from './fetch';
import { LoaderFunctionArgs } from 'react-router-dom';

export const useOptionsLoader = async () => {
  const services = await accessDatabase('GET', 'services');
  const paymentOptions = await accessDatabase('GET', 'payment-options');
  const certifications = await accessDatabase('GET', 'certifications');
  const appointmentTypes = await accessDatabase('GET', 'appointment-types');
  const languages = await accessDatabase('GET', 'languages');
  const gender = await accessDatabase('GET', 'gender');
  const pronouns = await accessDatabase('GET', 'pronouns');
  const ethnicity = await accessDatabase('GET', 'ethnicity');
  const organizationTypes = await accessDatabase('GET', 'organization-types');
  const age = await accessDatabase('GET', 'age');
  return {
    services,
    certifications,
    paymentOptions,
    appointmentTypes,
    languages,
    gender,
    pronouns,
    ethnicity,
    organizationTypes,
    age
  };
};

export const useMainPageLoader = async () => {
  const providers = await accessDatabase('GET', 'providers');
  const organizations = await accessDatabase('GET', 'organizations');
  mergeLocalStorage(providers);
  const options = await useOptionsLoader();

  return { providers, organizations, ...options };
};

export const useAdminLoader = async () => {
  const mainPageLoader = await useMainPageLoader();
  const pendingProviders = await accessDatabase('GET', 'providers', {
    params: { isPending: true }
  });
  const pendingOrganizations = await accessDatabase('GET', 'organizations', {
    params: { isPending: true }
  });

  // const reports = await accessDatabase('GET', 'admin/reports');

  return { ...mainPageLoader, pendingProviders, pendingOrganizations };
};

export const useProviderLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;
  const provider = await accessDatabase('GET', 'providers', {
    id: Number(userId)
  });
  mergeLocalStorage(provider);
  return { provider };
};
export const useOrganizationLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;
  const organization = await accessDatabase('GET', 'organizations', {
    id: Number(userId)
  });
  // mergeLocalStorage(organization);
  return { organization };
};

export const useEditFormLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;

  const options = await useOptionsLoader();
  const provider = await accessDatabase('GET', 'providers', {
    id: Number(userId)
  });

  return { provider, ...options };
};
