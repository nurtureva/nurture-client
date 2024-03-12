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
  getValues
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
          getValues={getValues}
        />
      </li>
    );
  });

  return (
    <>
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
  isOther,
  setValue,
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
        {...register(`${isDemographics ? 'demographics.' : ''}${dbName}`)}

      />
      {checked && isOther ? (
        <input onChange={e=>{setUserDescription(e.target.value)}}/>
      ) : (
        name
      )}
    </label>
  );
  };
