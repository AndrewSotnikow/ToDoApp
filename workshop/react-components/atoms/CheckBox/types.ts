import { InputHTMLAttributes, MutableRefObject, ReactNode } from 'react';

export type CheckboxProps = {
  native?: InputHTMLAttributes<HTMLInputElement>;
  checkedIcon: ReactNode;
  uncheckedIcon: ReactNode;
}

export type CheckboxRefs = {
  checkboxRef: MutableRefObject<HTMLInputElement | null>;
};
