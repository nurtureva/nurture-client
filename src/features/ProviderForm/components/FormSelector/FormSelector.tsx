import { SelectorProps } from '@/types';
import { useFormContext } from '../../utils/formContext';
import { Icon } from '@/components';
import { useEffect, useState } from 'react';

export const FormSelector = ({
  dbName,
  isDemographics,
  optionsArray,
  selection,
  selectorType,
  register,
  setValue,
  getValues,
  needsConsent,
  errors,
  errorMessage,
  required
}: // isDropdown
SelectorProps) => {
  const [optionsVisible, setOptionsVisible] = useState(
    selectorType !== 'dropdown'
  );
  const isDropdown = selectorType === 'dropdown';
  const optionsList = optionsArray?.map((option) => {
    return (
      <li key={option.id}>
        <Checkbox
          id={option.id}
          name={option.name}
          isOther={option.name.includes('please specify')}
          type={selection === 'single' ? 'radio' : 'checkbox'}
          isDemographics={isDemographics}
          register={register}
          dbName={dbName}
          setValue={setValue}
          required={required}
          getValues={getValues}
        />
      </li>
    );
  });
  return (
    <>
      {needsConsent ? (
        <div className="consent-question">
          <label>
            <input
              type="checkbox"
              {...register(`demographics.${dbName}-consent`)}
            />
            Display your {dbName} on your public-facing profile?
          </label>
        </div>
      ) : (
        ''
      )}
      <ul className={selectorType}>
        {isDropdown ? (
          <>
            <span>
              {dbName}
              <Icon
                type="carrot_down"
                onClick={() => {
                  setOptionsVisible(!optionsVisible);
                }}
              />
            </span>
            {optionsVisible && optionsList}
          </>
        ) : (
          optionsList
        )}
      </ul>
      {errors && errors[dbName] && (
        <span className="error-message">
          <Icon type="error_outline" />{' '}
          {errorMessage || 'This field is required'}
        </span>
      )}
    </>
  );
};

const Checkbox = ({
  type,
  id,
  name,
  register,
  isDemographics,
  dbName,
  required,
  isOther,
  getValues
}: {
  type: string;
  id: number;
  name: string;
  register: Function;
  isDemographics: boolean;
  dbName: string;
  isOther: boolean;
}) => {
  const [checked, setChecked] = useState();
  const [userDescription, setUserDescription] = useState('');
  useEffect(()=>{
    const init = getValues(dbName) || [];
    const newOne = [...init, {userDescription, id}];
    // if(userDescription) setValue(dbName, {userDescription, id})
  }, [userDescription])
  return (
    <label>
      <input
        type={type}
        onClick={(e) => {
          setChecked(e.currentTarget.checked);
        }}
        value={type === 'radio' ? name : id}
        {...register(`${isDemographics ? 'demographics.' : ''}${dbName}`, {required})}

      />
      {checked && isOther ? (
        <input onChange={e=>{setUserDescription(e.target.value)}}/>
      ) : (
        name
      )}
    </label>
  );
  };
