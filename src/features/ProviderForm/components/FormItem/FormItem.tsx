interface FormItemWrapperObject {
  name: string;
  children: React.ReactNode;
  description?: string;
  size: 'full' | 'large' | 'half' | 'small';
}

export const FormItem = ({
  name,
  children,
  description,
  size = 'full'
}: FormItemWrapperObject) => {
  return (
    <span className={`form-input-container ${size}`}>
      <label>
        {name}
        {children}
      </label>
      {description && <p>{description}</p>}
    </span>
  );
};
