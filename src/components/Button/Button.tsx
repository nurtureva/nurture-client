import { Link } from 'react-router-dom';
import './button.scss';

type ButtonProps = React.HTMLProps<HTMLButtonElement> &
  React.PropsWithChildren<{
    type: 'primary' | 'secondary' | 'tertiary';
    to?: string;
    search?: boolean;
    icon?: 'web' | 'email' | 'call' | 'map' | 'search';
  }>;

export const Button = (props: ButtonProps) => {
  const { type, children, search, icon, className, ...buttonProps } = props;
  const Element = props.to ? Link : ('button' as HTMLButtonElement);

  return (
    <Element
      className={`btn ${type} ${!children ? 'icon' : ''} ${className}`}
      {...{ ...buttonProps }}>
      {search ? <i className="icon-search" /> : ''}
      {icon ? <i className={`icon-${icon}`} /> : ''}
      {children}
    </Element>
  );
};
