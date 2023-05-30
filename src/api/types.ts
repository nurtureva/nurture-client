import { FormProvider, Option, ProviderObject, Reports } from '@/types';

export type OptionEndpoint = 'services' | 'certifications' | 'payment-options';
export type ProviderEndpoint = `providers${string}`;
export type ReportsEndpoint = 'admin/reports';
export type EndpointType = OptionEndpoint | ProviderEndpoint | ReportsEndpoint;
type OptionPostBody = { newOption: { name: string } };
type ProviderPostBody = { newProvider: FormProvider };
type ProviderPatchBody = ProviderPostBody & { id: number };
type DeleteFunction = (id: number) => void;
type Poster<T> = (body: T) => Promise<number>;

interface Getter<T> {
  (body: { id: number }): Promise<T>;
  (body?: never): Promise<T[]>;
}

type DbFunction = (
  method: MethodType,
  endpoint: EndpointType
) => (body?: any) => Promise<any>;

/**@type {T}*/
export interface CRUDFactory extends DbFunction {
  (method: 'GET', endpoint: ProviderEndpoint): Getter<ProviderObject>;
  (method: 'POST', endpoint: ProviderEndpoint): Poster<ProviderPostBody>;
  (method: 'PATCH', endpoint: ProviderEndpoint): Poster<ProviderPatchBody>;
  (method: 'GET', endpoint: OptionEndpoint): Getter<Option>;
  (method: 'POST', endpoint: OptionEndpoint): Poster<OptionPostBody>;
  (method: 'GET', endpoint: ReportsEndpoint): () => Promise<Reports>;
  (
    method: 'DELETE',
    endpoint: OptionEndpoint | ProviderEndpoint
  ): DeleteFunction;
}

export type MethodType = 'POST' | 'PATCH' | 'DELETE' | 'GET';
