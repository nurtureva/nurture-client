import { Option } from '@/types';

export interface CheckboxPropsObject {
  formKey: string;
  register: Function;
  optionsArray: Option[];
}

export default function CheckboxOptionGroup({
  formKey,
  register,
  optionsArray
}: CheckboxPropsObject) {
  return (
    <ul>
      {optionsArray.map((option) => {
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
