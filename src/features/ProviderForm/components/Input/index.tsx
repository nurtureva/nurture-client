export default function Input({
  register,
  dbName,
  type = 'text',
  foo
}: {
  register: Function;
  dbName: string;
  type: React.HTMLInputTxypeAttribute;
  foo: 'string';
}) {
  const Element = foo || 'input';
  return <Element type={type} {...register(`general.${dbName}`)} />;
}
