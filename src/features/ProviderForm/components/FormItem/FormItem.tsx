import React from 'react';
import { FormItem as FormItemObject } from '../../types';
import { Icon } from '@/components';

export const FormItem = (formItemProps: { input: FormItemObject }) => {
  const { input } = formItemProps;
  if (!input) return <span className={`form-input-container`}>{formItemProps.children}</span>;

  //todo update FormItem type to more accurately assert type for Element (string in JSON, FC any other time)
  const Element = input.Element as React.FC<any>;

  //we just use this for a unique id for each form item, that way we have accesible and semantic labels
  //todo factor this out to json input lists
  const formItemName: string = input.props.dbName;
  //todo remove required prop from being passed down, check on other unnecessary prop drilling
  const { size, errors, errorMessage, ...props } = input.props;
 function hasKey(obj, key) {
   // Check if the object has the key directly
   if (obj.hasOwnProperty(key)) {
     return true;
   }

   // Check if the object has a nested object named 'general'
   if (
     obj.hasOwnProperty('general') &&
     typeof obj.general === 'object' &&
     obj.general !== null
   ) {
     // Recursively check the 'general' object
     return hasKey(obj.general, key);
   }

   // If the key is not found
   return false;
 }

  const inputHasError = hasKey(errors, formItemName)
  return (
    <span
      className={`form-input-container${!!size ? ' ' + size : ''} ${
        inputHasError && 'error'
      }`}>
      <label>
        {input.name} {!!props.required ? '*' : '(optional)'}
        <Element id={formItemName} {...props} />
      </label>
      {inputHasError ? (
        <span className="error-message">
          <Icon type="error_outline" />{' '}
          {errorMessage || 'This field is required'}
        </span>
      ) : input.description ? (
        <label htmlFor={formItemName}>{input.description}</label>
      ) : (
        ''
      )}
    </span>
  );
};