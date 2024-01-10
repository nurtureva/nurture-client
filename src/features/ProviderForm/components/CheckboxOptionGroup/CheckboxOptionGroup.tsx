import { CustomInputParamsObject } from '@/types';
import { useFormContext } from '../../utils/formContext';

export const CheckboxOptionGroup = ({
  formKey,
  parentObjectName,
  optionsArray
}: CustomInputParamsObject) => {
  const {
    formFunctions: { register }
  } = useFormContext();
  return (
    <>
      <ul>
        {optionsArray?.map((option) => {
          return (
            <li key={option.id}>
              <label>
                <input
                  type="checkbox"
                  value={option.id}
                  {...register(
                    // @ts-ignore
                    `${
                      parentObjectName ? `${parentObjectName}.` : ''
                    }${formKey}`
                  )}
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
