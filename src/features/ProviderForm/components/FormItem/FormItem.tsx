import React, { useState } from 'react';
import { useFormContext } from '../../utils/formContext';
import { FormItem as FormItemObject } from '../../types';

export const FormItem = ({ input }: { input: FormItemObject }) => {
  const [isValid, setIsValid] = useState(true);
  const {
    formState: { canProceed, updateState }
  } = useFormContext();
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) setIsValid(false);
    else setIsValid(true);
  };
  //todo update FormItem type to more accurately assert type for Element (string in JSON, FC any other time)
  const Element = input.Element as React.FC<any>;

  //we just use this for a unique id for each form item, that way we have accesible and semantic labels
  //todo factor this out to json input lists
  const formItemName: string = input.props.dbName;

  //todo remove required prop from being passed down, check on other unnecessary prop drilling
  const { required, size, ...props } = input.props;
  return (
    <span className={`form-input-container${!!size ? ' ' + size : ''} `}>
      <label>
        {input.name} {!!required ? '*' : '(optional)'}
        <Element id={formItemName} onBlur={onBlur} {...props} />
      </label>
      {input.description && (
        <label htmlFor={formItemName}>{input.description}</label>
      )}
      {!isValid && <span>error!</span>}
    </span>
  );
};

const Radio = () => {
  return (
    <ul>
      <li>
        <label>
          <input type="radio" name="age" value="18" />
          18 - 20
        </label>
      </li>
      <li>
        <label>
          <input type="radio" name="age" value="21" />
          21-29
        </label>
      </li>
      <li>
        <label>
          <input type="radio" name="age" value="30" />
          30-39
        </label>
      </li>
      <li>
        <label>
          <input type="radio" name="age" value="40" />
          40-49
        </label>
      </li>
      <li>
        <label>
          <input type="radio" name="age" value="50" />
          50-59
        </label>
      </li>
      <li>
        <label>
          <input type="radio" name="age" value="60" />
          60 or older
        </label>
      </li>
    </ul>
  );
};
