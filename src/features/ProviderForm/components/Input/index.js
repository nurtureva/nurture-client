export default function Input({ register, dbName, type = 'text', element }) {
  const Element = element || 'input';
  return <Element type={type} {...register(`general.${dbName}`)} />;
}
