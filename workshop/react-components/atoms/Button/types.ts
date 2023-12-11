import {
  ButtonHTMLAttributes,
  ReactNode,
  MutableRefObject,
} from 'react';

export type IconDirection = 'left' | 'right';

export type ButtonProps = {
  icon?: ReactNode;
  iconPosition?: IconDirection;
  native?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export type ButtonRefs = {
  buttonRef: MutableRefObject<HTMLButtonElement | null>;
};
