import { InputHTMLAttributes, MutableRefObject, ReactNode } from 'react';

export type CheckboxProps = {
  native?: InputHTMLAttributes<HTMLInputElement>;
  CheckedIcon: ReactNode;
  UncheckedIcon: ReactNode;
}

export type CheckboxRefs = {
  checkboxRef: MutableRefObject<HTMLInputElement | null>;
};
