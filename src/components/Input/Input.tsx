import './input.scss';

export const Input = (props) => {
  const { icon, label, ...otherInputProps } = props;
  const { innerRef, ...inputProps } = otherInputProps;
  return (
    <span className="input-container">
      {label && <label>{label}</label>}
      {icon ? <i className={`icon-${icon}`} /> : ''}
      <input ref={innerRef} {...inputProps} />
    </span>
  );
};
