import { forwardRef, useImperativeHandle, useRef } from 'react';
import { InputProps, InputRef } from './types';
import { debounce } from "#libraries/@core/helpers/debounce";
import { createClassName } from '#libraries/@core/dom/createClassName'

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    native = {},
    debounceMs
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => {
    return {
      inputRef,
    };
  });

  return (
    <input
      ref={inputRef}
      {...native}
      type="text"
      className={createClassName([
        'input',
        native?.disabled ? 'input--disabled' : '',
        native.checked ? 'input--checked' : '',
      ])}
    />
  );
});
