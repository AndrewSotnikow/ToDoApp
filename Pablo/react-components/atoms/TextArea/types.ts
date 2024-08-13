import { TextareaHTMLAttributes, MutableRefObject } from 'react';

export type TextAreaProps = {
  native?: TextareaHTMLAttributes<HTMLTextAreaElement>;
};

export type TextAreaRefs = {
  textAreaRef: MutableRefObject<HTMLTextAreaElement | null>;
  setValue: (value: string) => void;
};
