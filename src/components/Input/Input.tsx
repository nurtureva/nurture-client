import './input.scss';

export const Input = (props) => {
  const { icon, label, ...inputProps } = props;
  return (
    // <div className="input-group">
    <span className="input-container">
      {label && <label>{label}</label>}
      {icon ? <i className={`icon-${icon}`} /> : ''}
      <input {...inputProps} />
    </span>
    // </div>
  );
};
