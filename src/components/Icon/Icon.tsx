import { MouseEventHandler } from 'react';
import { Icon as IconType } from '../types';

export const Icon: React.FC<{
  type: IconType;
  onClick?: MouseEventHandler<HTMLElement>;
}> = ({ type, onClick }) => {
  return <i className={`icon-${type}`} onClick={onClick} />;
};
