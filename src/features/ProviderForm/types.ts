import { FormProvider, Option, ProviderObject } from '@/types';
import { UseFormRegister } from 'react-hook-form';

export type PageStateTitle =
  | 'Basic Details'
  | 'Contact'
  | 'About'
  | 'Professional Details'
  | 'Demographics'
  | 'Confirmation';

interface BaseInputObject {
  size?: 'half' | 'full' | 'large' | 'small';
  name: string;
  description?: string;
  stubName: PageStateTitle;
}

export interface GenericInputObject extends BaseInputObject {
  dbName: keyof FormProvider['general'];
  props?: GenericInputProps;
}
interface GenericInputProps {
  element: 'textarea';
  type?: React.HTMLInputTypeAttribute;
}

interface CustomInputObject extends BaseInputObject {
  Element: React.FC<any>;
  props: CustomInputProps;
}
interface CustomInputProps {
  formKey?: keyof FormProvider;
  dbName?: keyof ProviderObject;
  optionsArray?: Option[];
  isTogglable?: boolean;
}

export type InputObject = GenericInputObject | CustomInputObject;

export interface CustomInputParamsObject {
  formKey: keyof FormProvider;
  optionsArray?: Option[];
  isTogglable?: boolean;
}

export type FormType = 'individual' | 'organization';
