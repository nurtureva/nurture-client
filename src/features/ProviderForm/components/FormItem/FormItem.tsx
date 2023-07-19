interface FormItemWrapperObject {
  name: string;
  children: React.ReactNode;
  description?: string;
}

export const FormItem = ({
  name,
  children,
  description
}: FormItemWrapperObject) => {
  return (
    <span className="form-input-container">
      <label>
        {name}
        {children}
      </label>
      {description && <p>{description}</p>}
    </span>
  );
};
