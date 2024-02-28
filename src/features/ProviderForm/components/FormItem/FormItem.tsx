import React, { useState } from 'react';
import { useFormContext } from '../../utils/formContext';
import { FormItem as FormItemObject } from '../../types';

export const FormItem = (formItemProps: { input: FormItemObject }) => {
  const { input } = formItemProps;
  if (!input) return <span className={`form-input-container`}>{formItemProps.children}</span>;

  //todo update FormItem type to more accurately assert type for Element (string in JSON, FC any other time)
  const Element = input.Element as React.FC<any>;

  //we just use this for a unique id for each form item, that way we have accesible and semantic labels
  //todo factor this out to json input lists
  const formItemName: string = input.props.dbName;

  //todo remove required prop from being passed down, check on other unnecessary prop drilling
  const { size, ...props } = input.props;
  return (
    <span className={`form-input-container${!!size ? ' ' + size : ''} `}>
      <label>
        {input.name} {!!props.required ? '*' : '(optional)'}
        <Element id={formItemName} {...props} />
      </label>
      {input.description && (
        <label htmlFor={formItemName}>{input.description}</label>
      )}
    </span>
  );
};