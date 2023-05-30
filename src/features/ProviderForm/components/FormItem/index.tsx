interface FormItemWrapperObject {
  name: string;
  children: React.ReactNode;
  description?: string;
}

export default function FormItem({
  name,
  children,
  description
}: FormItemWrapperObject) {
  return (
    <span className="input-container">
      <label>
        <p>{name}</p>
        {description && <p>{description}</p>}
      </label>
      {children}
    </span>
  );
}
