import { InputHTMLAttributes, ReactNode, MutableRefObject } from 'react';

export type CheckboxProps = {
  checkIcon?: ReactNode;
  uncheckIcon?: ReactNode;
  native?: InputHTMLAttributes<HTMLInputElement>;
};

export type CheckboxRefs = {
  checkboxRef: MutableRefObject<HTMLInputElement | null>;
  setIsChecked: (isChecked: boolean) => void;
  setIsFocused: (isFocused: boolean) => void;
};
