import {
  FormProvider,
  FormOrganization,
  Option,
  OrganizationObject,
  ProviderNoOptions,
  ProviderObject,
  Reports,
  Subset,
  ZipCode
} from '@/types';

export type OptionEndpoint = 'services' | 'certifications' | 'payment-options';
export type ProviderEndpoint = `providers`;
export type OrganizationEndpoint = 'organizations';
export type ReportsEndpoint = 'admin/reports';
export type ZipCodeEndpoint = 'zip-codes';
export type UploadEndpoint = 'upload';
export type EndpointType =
  | OptionEndpoint
  | ProviderEndpoint
  | OrganizationEndpoint
  | ReportsEndpoint
  | ZipCodeEndpoint
  | UploadEndpoint;
type OptionPostBody = { newOption: { name: string } };
type ProviderPostBody = { newProvider: ProviderNoOptions };

export type Props = {
  body?: any;
  id?: number;
  params?: { [key: string]: string | number | boolean };
};

export interface FetchFunction {
  (
    method: 'GET',
    endpoint: OptionEndpoint,
    props: { id: number }
  ): Promise<Option>;
  (method: 'GET', endpoint: OptionEndpoint, props?: never): Promise<Option[]>;
  (
    method: 'GET',
    endpoint: ProviderEndpoint,
    props: { id: number }
  ): Promise<ProviderObject>;
  (
    method: 'GET',
    endpoint: OrganizationEndpoint,
    props: { id: number }
  ): Promise<OrganizationObject>;
  (
    method: 'GET',
    endpoint: ProviderEndpoint,
    props?: { params?: { isPending: boolean } }
  ): Promise<ProviderObject[]>;
  (
    method: 'GET',
    endpoint: OrganizationEndpoint,
    props?: { params?: { isPending: boolean } }
  ): Promise<OrganizationObject[]>;
  (method: 'GET', endpoint: ReportsEndpoint, props?: never): Promise<Reports>;
  (
    method: 'GET',
    endpoint: ZipCodeEndpoint,
    props: { params: { value: string; radius: number } }
  ): Promise<ZipCode[]>;
  (
    method: 'POST',
    endpoint: OptionEndpoint,
    props: { body: { newService: { name: string } } }
  ): Promise<number>;
  (
    method: 'POST',
    endpoint: ProviderEndpoint,
    props: { body: FormProvider }
  ): Promise<{ id: number }>;
  (
    method: 'POST',
    endpoint: OrganizationEndpoint,
    props: { body: FormOrganization }
  ): Promise<{ id: number }>;
  (
    method: 'POST',
    endpoint: UploadEndpoint,
    props: { body: FormData }
  ): Promise<number>;
  (
    method: 'PATCH',
    endpoint: ProviderEndpoint,
    props: {
      id: number;
      body: Subset<FormProvider>;
    }
  ): Promise<number>;
  (
    method: 'PATCH',
    endpoint: OrganizationEndpoint,
    props: {
      id: number;
      body: Subset<FormOrganization>;
    }
  ): Promise<number>;
  (
    method: 'DELETE',
    endpoint: OptionEndpoint | ProviderEndpoint | OrganizationEndpoint,
    props: { id: number }
  ): void;
}

export type MethodType = 'POST' | 'PATCH' | 'DELETE' | 'GET';
