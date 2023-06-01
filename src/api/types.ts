import {
  FormProvider,
  Option,
  ProviderNoOptions,
  ProviderObject,
  Reports,
  ZipCode
} from '@/types';

export type OptionEndpoint = 'services' | 'certifications' | 'payment-options';
export type ProviderEndpoint = `providers`;
export type ReportsEndpoint = 'admin/reports';
export type ZipCodeEndpoint = 'zip-codes';
export type EndpointType =
  | OptionEndpoint
  | ProviderEndpoint
  | ReportsEndpoint
  | ZipCodeEndpoint;
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
    endpoint: ProviderEndpoint,
    props?: { params?: { isPending: boolean } }
  ): Promise<ProviderObject[]>;
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
    props: { body: { newProvider: FormProvider } }
  ): Promise<number>;
  (
    method: 'PATCH',
    endpoint: ProviderEndpoint,
    props: {
      id: number;
      body: { patchBody: Partial<ProviderNoOptions> };
    }
  ): Promise<number>;
  (
    method: 'DELETE',
    endpoint: OptionEndpoint | ProviderEndpoint,
    props: { id: number }
  ): void;
}

export type MethodType = 'POST' | 'PATCH' | 'DELETE' | 'GET';
