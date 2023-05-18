export default function FormItem({ name, children, description }) {
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
