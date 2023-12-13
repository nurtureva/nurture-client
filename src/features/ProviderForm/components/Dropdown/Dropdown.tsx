import { CustomInputParamsObject } from '../../types';
import { useFormContext } from '../../utils/formContext';

export const Dropdown = ({
  formKey,
  optionsArray
}: CustomInputParamsObject) => {
  const {
    formFunctions: { register }
  } = useFormContext();
  return (
    <>
      <select>
        {optionsArray?.map((option) => {
          return (
            <option
              {...register(`${formKey}`)}
              value={option.id}
              key={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
    </>
  );
};
