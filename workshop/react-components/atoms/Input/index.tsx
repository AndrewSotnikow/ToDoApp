import { forwardRef, useImperativeHandle, useRef, ChangeEvent } from 'react';
import { InputProps, InputRef } from './types';

import { createClassName } from '#libraries/dom/createClassName';
import { debounce } from '#libraries/@core/helpers/debounce'
import { createNameSpace } from '#libraries/@core/dom/createNameSpace'


// TODO
// continue develop component
// add debounce
// add createNameSpace
export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    native = {},
    debounceMs= 0
  } = props;
  const { disabled = false, checked  = false } = native;
  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => {
    return {
      inputRef,
    };
  });

const handleInputOnChangeWithDebounce = (e:  ChangeEvent<HTMLInputElement>) => debounce(()=> native?.onChange?.(e), debounceMs)

  return (
    <input
      ref={inputRef}
      {...native}
      onChange={handleInputOnChangeWithDebounce}
      type="text"
      className={createClassName([
        ns().root,
        ...(disabled ? [ns.input('disabled').value, 'disabled'] : []),
        ...(checked ? [ns.input('checked').value, 'checked'] : []),
      ])}
    />
  );
});

const ns = createNameSpace(Object.keys({ Input })[0]);
