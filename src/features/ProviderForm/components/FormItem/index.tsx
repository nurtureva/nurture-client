export default function FormItem({
  name,
  children,
  description
}: {
  name: string;
  children: JSX.Element;
  description: string;
}) {
  return (
    <span className="input-container">
      <label>
        <p>{name}</p>
        <p>{description}</p>
      </label>
      {children}
    </span>
  );
}
