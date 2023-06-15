import { FormProvider, Option } from '@/types';
import { UseFormRegister } from 'react-hook-form';

interface BaseInputObject {
  name: string;
  description?: string;
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
  Element: React.FC<CustomInputParamsObject>;
  props: CustomInputProps;
}
interface CustomInputProps {
  formKey: keyof FormProvider;
  optionsArray: Option[];
}

export type InputObject = GenericInputObject | CustomInputObject;

export interface CustomInputParamsObject {
  formKey: keyof FormProvider;
  register: UseFormRegister<FormProvider>;
  optionsArray?: Option[];
  dbName?: keyof FormProvider['general'];
}
