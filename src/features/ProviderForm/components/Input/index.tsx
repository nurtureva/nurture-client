export default function Input({
  register,
  dbName,
  type = 'text',
  element
}: {
  register: Function;
  dbName?: string;
  type?: React.HTMLInputTypeAttribute;
  element?: string;
}) {
  const Element = element || 'input';
  return <Element type={type} {...register(`general.${dbName}`)} />;
}
