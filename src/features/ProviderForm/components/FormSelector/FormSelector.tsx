import { SelectorProps } from '@/types';
import { useFormContext } from '../../utils/formContext';
import { Icon } from '@/components';
import { useState } from 'react';

/**
 * dbName --> dbOptionTableName
 * dbOptionTableName: keyof FormProvider
 * parentObjectName --> dataGroup
 * dataGroup: 'general' | 'demographics'
 * optionsArray: Option[];
 * selection: 'single' | 'multiple'
 * style: 'input' | 'dropdown' <--- input is checkbox/radio dropdown is dropdown. both can be single or multiple select
 * includeDescription: boolean;
 * includeOther: boolean; <--- this should actually come from the database
 * otherLabel: 'other' | string; <--- and so will this
 */

export const FormSelector = ({
  dbName,
  isDemographics,
  optionsArray,
  selection,
  selectorType,
  register
}: // isDropdown
SelectorProps) => {
  const [optionsVisible, setOptionsVisible] = useState(
    selectorType !== 'dropdown'
  );

  const isDropdown = selectorType === 'dropdown';
  const optionsList = optionsArray?.map((option) => {
    return (
      <li key={option.id}>
        {/* <label>
          <input
            type={selection === 'single' ? 'radio' : 'checkbox'}
            value={option.id}
            {...register(
              // @ts-ignore
              `${isDemographics ? 'demographics.' : ''}${dbName}`
            )}
          />
          {option.name}
        </label> */}
        <Checkbox
          id={option.id}
          name={option.name}
          type={selection === 'single' ? 'radio' : 'checkbox'}
          isDemographics={isDemographics}
          register={register}
          dbName={dbName}
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
                  console.log('test');
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
  dbName
}: {
  type: string;
  id: number;
  name: string;
  register: Function;
  isDemographics: boolean;
  dbName: string;
}) => {
  const isOther = true;
  const [checked, setChecked] = useState(false);
  const [userDescription, setUserDescription] = useState('');
  return (
    <label>
      <input
        type={type}
        value={id}
        {...register(`${isDemographics ? 'demographics.' : ''}${dbName}`)} // @ts-ignore
      />
      {checked ? <input /> : name}
    </label>
  );
};
