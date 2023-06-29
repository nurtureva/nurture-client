import './input.scss';

export const Input = (props) => {
  const { icon, label, ...inputProps } = props;
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <span className="input-container">
        {icon ? <i className={`icon-${icon}`} /> : ''}
        <input {...inputProps} />
      </span>
    </div>
  );
};
