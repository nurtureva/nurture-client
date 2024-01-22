import React, { useState } from 'react';
import { FormInput } from '../FormInput';
import { useFormContext } from '../../utils/formContext';
import { InputObject } from '../../types';

interface FormItemWrapperObject {
  input: {
    name: string;
    children: React.ReactNode;
    description?: string;
    size?: 'full' | 'large' | 'half' | 'small';
    Element?: any;
    dbName?: string;
    props?: any;
    rules?: any;
  };
}

export const FormItem = ({ input }: { input: InputObject }) => {
  const [isValid, setIsValid] = useState(true);
  const {
    formState: { canProceed, updateState }
  } = useFormContext();
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) setIsValid(false);
    else setIsValid(true);
  };

  const formItemName: string =
    //@ts-ignore
    input.dbName || input.props?.dbName || input.props?.formKey;
  return (
    <span className={`form-input-container ${input.size ? input.size : ''} `}>
      <label>
        {input.name} {input.required ? '*' : '(optional)'}
        {'Element' in input ? (
          <input.Element {...input.props} />
        ) : (
          <FormInput
            dbName={input.dbName}
            id={formItemName}
            parentObjectName={input.parentObjectName}
            {...input.props}
            onBlur={onBlur}
          />
        )}
      </label>
      {input.description && (
        <label htmlFor={formItemName}>{input.description}</label>
      )}
      {!isValid && <span>error!</span>}
    </span>
  );
};
