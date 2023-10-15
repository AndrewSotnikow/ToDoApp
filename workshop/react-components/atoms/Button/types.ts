import { ButtonHTMLAttributes, ReactNode, MutableRefObject } from 'react';

export type ButtonProps = {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  native?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export type ButtonRefs = {
  buttonRef: MutableRefObject<HTMLButtonElement | null>;
};
