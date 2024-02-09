import { FormProvider, Option, ProviderObject } from '@/types';

export type PageStateTitle =
  | 'Basic Details'
  | 'Contact'
  | 'About'
  | 'Professional Details'
  | 'Demographics'
  | 'Confirmation';

// interface BaseInputObject {
//   name: string;
//   size?: 'half' | 'full' | 'large' | 'small';
//   description?: string;
//   stubName: PageStateTitle;
// }

// export interface GenericInputObject extends BaseInputObject {
//   parentObjectName?: 'string';
//   dbName: keyof FormProvider['general'] | keyof FormProvider;
//   props?: GenericInputProps;
// }
// interface GenericInputProps {
//   element: 'textarea';
//   type?: React.HTMLInputTypeAttribute;
// }

export interface BaseFormItemProps {
  dbName: keyof FormProvider['general'] | keyof Omit<FormProvider, 'general'>;
  size?: 'half' | 'full' | 'large' | 'small';
  required?: boolean;
}

export interface InputProps extends BaseFormItemProps {
  placeholder?: string;
  isTextArea?: boolean;
}

export interface SelectorProps extends BaseFormItemProps {
  dbName: keyof Omit<FormProvider, 'general'>;
  selection: 'single' | 'multiple';
  isDemographics?: boolean;
  isDropdown?: boolean;
  optionsArray: Option[];
  selectorType: 'input' | 'dropdown';
}

interface BaseFormItem {
  name: string;
  description?: string;
  stubName: PageStateTitle;
  Element: 'SELECTOR' | 'INPUT' | 'PHOTO' | React.FC<any>;
}

export type FormItem = BaseFormItem &
  (
    | { Element: 'SELECTOR' | React.FC<any>; props: SelectorProps }
    | { Element: 'INPUT' | React.FC<any>; props: InputProps }
    | { Element: 'PHOTO' | React.FC<any>; props: BaseFormItemProps }
  );

export type FormFields = { [key in PageStateTitle]: FormItem[] };

// type FormItemObject = FormItemProps & {
//   name: string;
//   description?: string;
//   stubName: PageStateTitle;
//   Element: 'SELECTOR' | 'PHOTO' | 'INPUT';
//   size?: 'half' | 'full' | 'large' | 'small';
//   required: boolean;
//   props: {
//     dbName: keyof FormProvider['general'] | keyof FormProvider;
//   };
// };

// type FormItemProps = FormPhotoInputProps | FormSelectorProps | FormInputProps;

// interface FormPhotoInputProps {
//   element: 'PHOTO';
//   props: {};
// }
// interface FormSelectorProps {
//   element: 'SELECTOR';
//   props: {};
// }
// interface FormInputProps {
//   element: 'INPUT';
//   props: {
//     isTextarea: boolean;
//   };
// }

// interface CustomInputObject extends BaseInputObject {
//   Element: React.FC<any>;
//   props: CustomInputProps;
// }
// interface CustomInputProps {
//   formKey?: keyof FormProvider;
//   dbName?: keyof ProviderObject;
//   optionsArray?: Option[];
//   isTogglable?: boolean;
// }

// export type InputObject = GenericInputObject | CustomInputObject;

// export interface CustomInputParamsObject {
//   formKey: keyof FormProvider;
//   parentObjectName: string;
//   optionsArray?: Option[];
//   isTogglable?: boolean;
// }

export type FormType = 'individual' | 'organization';
