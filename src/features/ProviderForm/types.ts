import { Option } from '@/types';

interface BaseInputObject {
  name: string;
  description?: string;
}

interface GenericInputObject extends BaseInputObject {
  dbName: string;
  props?: GenericInputProps;
}
interface GenericInputProps {
  element: string;
  type?: string;
}

interface CustomInputObject extends BaseInputObject {
  Element: React.FC<CheckboxPropsObject>;
  props: CustomInputProps;
}
interface CustomInputProps {
  formKey: string;
  optionsArray: Option[];
}

export type InputObject = GenericInputObject | CustomInputObject;

export interface CheckboxPropsObject {
  formKey: string;
  register: Function;
  optionsArray: Option[];
}
