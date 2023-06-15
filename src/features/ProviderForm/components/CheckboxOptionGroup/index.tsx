import { CustomInputParamsObject } from '@/types';

export default function CheckboxOptionGroup({
  formKey,
  register,
  optionsArray
}: CustomInputParamsObject) {
  return (
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
  );
}
