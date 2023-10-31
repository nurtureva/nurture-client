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
  logo?: string;
  role?: string;
  profile_photo?: string;
}
export interface OrganizationNoOptions {
  date_created: Date;
  id: number;
  name: string;
  email: string;
  website?: string;
  phone?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  zip?: string;
  edit_hash?: string;
  needs_review: boolean;
  overview?: string;
  isBookmarked: boolean;
  logo?: string;
  yearEstablished: number;
}

export type OptionType =
  | 'appointmentOptions'
  | 'paymentOptions'
  | 'services'
  | 'certifications'
  | 'appointmentType';

export type OrganizationOptionType = Exclude<OptionType, 'certifications'>;

export type OptionsGenerator<T, OptionList extends OptionType> = {
  [optionName in OptionList]?: T[];
};

export interface Option {
  name: string;
  id: number;
}

export interface OptionsObject {
  [key: string]: Option[];
}

export type ProviderOptions = OptionsGenerator<Option, OptionType>;
export type OrganizationOptions = OptionsGenerator<
  Option,
  OrganizationOptionType
>;

export type OrganizationObject = OrganizationNoOptions & OrganizationOptions;
export type ProviderObject = ProviderNoOptions & ProviderOptions;

interface FormProviderGeneralObject
  extends Omit<ProviderNoOptions, 'logo' | 'profile_photo'> {
  logo: File[];
  profile_photo: File[];
}

export interface FormProvider extends OptionsGenerator<string, OptionType> {
  general: Omit<ProviderNoOptions, 'logo' | 'profile_photo'>;
}
export interface FormOrganization
  extends OptionsGenerator<string, OrganizationOptionType> {
  general: Omit<OrganizationNoOptions, 'logo'>;
}

export type FilterType = Exclude<OptionType, 'certifications'>;

export type FilterObject = {
  [filterName in FilterType]?: number[];
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
