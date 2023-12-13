import { Link } from 'react-router-dom';
import { ButtonProps } from '@/types';
import { Icon } from '../Icon';

export const Button = (props: ButtonProps) => {
  const {
    type = 'primary',
    isSubmit,
    children,
    icon,
    size,
    state,
    className: instanceClassName,
    ...buttonProps
  } = props;
  const className = `button ${type}${!children ? ' icon' : ''}${
    size ? ' ' + size : ''
  }${instanceClassName ? ' ' + instanceClassName : ''}`;

  if (props.to) {
    if (props.to.includes('http')) {
      return (
        <a
          href={props.to}
          target="_blank"
          rel="noopener noreferrer"
          {...{ className }}>
          {children}
        </a>
      );
    }
    return (
      <Link to={props.to} state={state || {}} {...{ className }}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      {...{ ...buttonProps, className }}>
      {icon ? <Icon type={icon} /> : ''}
      {children}
    </button>
  );
};
