import { SelectorProps } from '@/types';
import { useFormContext } from '../../utils/formContext';
import { Icon } from '@/components';
import { useEffect, useState } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';

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
  const animatedComponents = makeAnimated();

  let dropdownOptions = optionsArray.map((option) => {
    return {
      value: option.id,
      label: option.name
    };
  });

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none !important',
      boxShadow: 'none !important'
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: '15px'
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#F9E3BD' : 'white',
      color: 'black',
      cursor: 'pointer'
    })
  };
  return (
    <>
      {needsConsent ? (
        <div className="consent-question">
          <label>
            <input
              type="checkbox"
              {...register(`demographics.${dbName}_consent`)}
            />
            Display your {dbName} on your public-facing profile?
          </label>
        </div>
      ) : (
        ''
      )}
      <ul className={selectorType}>
        {isDropdown ? (
          <div>
            <Select
              className="basic-single"
              classNamePrefix="select"
              components={animatedComponents}
              name="color"
              isMulti
              closeMenuOnSelect={false}
              options={dropdownOptions}
              styles={customStyles}
            />
            {optionsVisible && optionsList}
          </div>
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
  useEffect(() => {
    const init = getValues(dbName) || [];
    const newOne = [...init, { userDescription, id }];
    // if(userDescription) setValue(dbName, {userDescription, id})
  }, [userDescription]);
  return (
    <label>
      <input
        type={type}
        onClick={(e) => {
          setChecked(e.currentTarget.checked);
        }}
        value={type === 'radio' ? name : id}
        {...register(`${isDemographics ? 'demographics.' : ''}${dbName}`, {
          required
        })}
      />
      {checked && isOther ? (
        <input
          onChange={(e) => {
            setUserDescription(e.target.value);
          }}
        />
      ) : (
        name
      )}
    </label>
  );
};
