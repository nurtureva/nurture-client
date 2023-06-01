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
  needs_review: boolean;
  overview?: string;
  isBookmarked: boolean;
  logo?: Url;
  role?: Url;
  profile_photo?: string;
}

export type OptionType =
  | 'appointmentOptions'
  | 'paymentOptions'
  | 'services'
  | 'certifications';

export type ProviderOptionsGenerator<T> = {
  [optionName in OptionType]?: T[];
};

export interface Option {
  name: string;
  id: number;
}

export interface OptionsObject {
  [key: string]: Option[];
}

export type ProviderOptions = ProviderOptionsGenerator<Option>;

export type ProviderObject = ProviderNoOptions & ProviderOptions;

export interface FormProvider extends ProviderOptionsGenerator<string> {
  general: ProviderNoOptions;
}

export type FilterType = Exclude<OptionType, 'certifications'>;

export type FilterObject = {
  [filterName in FilterType]?: string[];
} & { bookmarkFilter: boolean };

export interface SearchObject {
  keyword?: string;
  distance?: string;
}

export interface FiltersContainerObject {
  filters: FilterObject;
  searchTerm: SearchObject;
}

export type ActionType = 'UPDATE_SEARCH' | 'UPDATE_FILTERS';

export interface ReducerAction {
  type: ActionType;
  newSearchTerm: SearchObject;
  filters: FilterObject;
}
