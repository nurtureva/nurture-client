import { CustomInputParamsObject } from '@/types';
import { useFormContext } from '../../utils/formContext';

export const CheckboxOptionGroup = ({
  formKey,
  optionsArray,
  isTogglable
}: CustomInputParamsObject) => {
  const {
    formFunctions: { register }
  } = useFormContext();
  return (
    <>
      {/* <div>
        <label htmlFor="yes">Yes</label>
        <input
          type="radio"
          value="yes"
          name={`${optionsArray}-visibility-toggle`}
          // checked={providerType === 'individual'}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <label htmlFor="organization">No</label>
        <input
          type="radio"
          value="no"
          name={`${optionsArray}-visibility-toggle`}
          // checked={providerType === 'organization'}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
      </div> */}
      <ul>
        {optionsArray?.map((option) => {
          return (
            <li key={option.id}>
              <label>
                <input
                  type="checkbox"
                  value={option.id}
                  {...register(`${formKey}`)}
                />
                {option.name}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};
