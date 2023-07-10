import { Link } from 'react-router-dom';
import './button.scss';

type ButtonProps = React.HTMLProps<HTMLButtonElement> &
  React.PropsWithChildren<{
    type: 'primary' | 'secondary' | 'tertiary' | 'submit';
    size?: 'small';
    to?: string;
    search?: boolean;
    icon?: 'web' | 'email' | 'call' | 'map' | 'search';
  }>;

export const Button = (props: ButtonProps) => {
  const { type, children, search, icon, size, className, ...buttonProps } =
    props;
  const Element = props.to ? Link : ('button' as HTMLButtonElement);
  if (type === 'submit') buttonProps.type = type;
  return (
    <Element
      className={`btn ${type === 'submit' ? 'primary' : type} ${size} ${
        !children ? 'icon' : ''
      } ${className}`}
      {...{ ...buttonProps }}>
      {search ? <i className="icon-search" /> : ''}
      {icon ? <i className={`icon-${icon}`} /> : ''}
      {children}
    </Element>
  );
};
