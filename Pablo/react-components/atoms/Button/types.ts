import {
  ButtonHTMLAttributes,
  MutableRefObject,
} from 'react';

export type ButtonProps = {
  native?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export type ButtonRefs = {
  buttonRef: MutableRefObject<HTMLButtonElement | null>;
};
