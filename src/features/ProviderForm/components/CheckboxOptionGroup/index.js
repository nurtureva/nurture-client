export default function CheckboxOptionGroup({
  title,
  formKey,
  register,
  optionsArray
}) {
  return (
    <ul>
      {optionsArray.map((option) => {
        return (
          <li key={option.id}>
            <label>
              <input
                type="checkbox"
                value={option.id}
                name={title}
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
