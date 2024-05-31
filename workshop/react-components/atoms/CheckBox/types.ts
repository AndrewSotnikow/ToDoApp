import { InputHTMLAttributes, MutableRefObject, ReactNode } from 'react';

export type CheckBoxProps = {
  native?: InputHTMLAttributes<HTMLInputElement>;
  checkedIcon?: ReactNode;
  uncheckedIcon?: ReactNode;
}

export type CheckBoxRefs = {
  CheckBoxRef: MutableRefObject<HTMLInputElement | null>;
};
