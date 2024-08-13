import { InputHTMLAttributes, MutableRefObject } from 'react';

export type InputProps = {
  native?: InputHTMLAttributes<HTMLInputElement>;
};

export type InputRefs = {
  inputRef: MutableRefObject<HTMLInputElement | null>;
  setValue: (value: string) => void;
};
