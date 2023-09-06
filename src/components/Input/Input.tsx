import { InputProps } from '@/types';
import { Icon } from '../Icon';

export const Input = (props: InputProps) => {
  const { icon, label, ...otherInputProps } = props;
  const { innerRef, ...inputProps } = otherInputProps;

  return (
    <span className="input-container">
      {label && <label>{label}</label>}
      {icon ? <Icon type={icon} /> : ''}
      <input ref={innerRef} {...inputProps} />
    </span>
  );
};
