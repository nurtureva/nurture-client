import { title } from 'process';
import { FC, ReactNode, useState } from 'react';
import { Icon } from '..';

type ModalProps = {
  title: string;
  children: ReactNode;
  closeHandler: () => void;
  size: 'small' | 'medium' | 'large';
};

export const Modal: FC<ModalProps> = ({
  title,
  children,
  closeHandler,
  size
}) => {
  return (
    <>
      <div className="backdrop" onClick={closeHandler}>
        <div className={`modal ${size}`}>
          <Icon type="clear" onClick={closeHandler} />
          <h3>{title}</h3>
          {children}
        </div>
      </div>
    </>
  );
};
