import React, { EventHandler, useEffect, useState } from 'react';
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

  return (
    <span className={`form-input-container ${input.size}`}>
      <label>
        {input.name}
        {'Element' in input ? (
          <input.Element {...input.props} />
        ) : (
          <FormInput dbName={input.dbName} {...input.props} onBlur={onBlur} />
        )}
      </label>
      {input.description && <p>{input.description}</p>}
      {!isValid && <span>error!</span>}
    </span>
  );
};
