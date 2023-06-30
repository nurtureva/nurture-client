import { Link } from 'react-router-dom';
import './button.scss';

type ButtonProps = React.HTMLProps<HTMLButtonElement> &
  React.PropsWithChildren<{
    type: 'primary' | 'secondary' | 'tertiary';
    to?: string;
    search?: boolean;
    size?: 'small';
    icon?: 'web' | 'email' | 'call' | 'map' | 'search';
  }>;

export const Button = (props: ButtonProps) => {
  const { type, children, search, icon, size, className, ...buttonProps } =
    props;
  const Element = props.to ? Link : ('button' as HTMLButtonElement);

  return (
    <Element
      className={`btn ${type} ${size} ${!children ? 'icon' : ''} ${className}`}
      {...{ ...buttonProps }}>
      {search ? <i className="icon-search" /> : ''}
      {icon ? <i className={`icon-${icon}`} /> : ''}
      {children}
    </Element>
  );
};
