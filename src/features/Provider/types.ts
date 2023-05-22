import { Url } from 'url';

export interface ProviderNoOptions {
  date_created: Date;
  id: number;
  name: string;
  email: string;
  business_name?: string;
  website?: string;
  phone?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  zip?: string;
  pronouns?: string;
  bio?: string;
  edit_hash?: string;
  languages_spoken?: string;
  needs_review: false;
  overview?: string;
  logo?: Url;
  role?: Url;
  profile_photo?: string;
}

export interface ProviderObject extends ProviderNoOptions {
  appointment_options: Option[];
  paymentOptions: Option[];
  services: Option[];
  certifications: Option[];
}

export interface Option {
  name: string;
  id: number;
}

export interface OptionsObject {
  [key: string]: Option[];
}

export type FilterType = 'services' | 'paymentOptions';

export interface FiltersContainerObject {
  filters: FilterObject;
  searchTerm: SearchObject;
}

export interface FilterObject {
  services: string[];
  paymentOptions: string[];
}

export interface SearchObject {
  keyword?: string;
  distance?: string;
}

export type ActionType = 'UPDATE_SEARCH' | 'UPDATE_FILTERS';

export interface ReducerAction {
  type: ActionType;
  newSearchTerm: SearchObject;
  filters: FilterObject;
}
