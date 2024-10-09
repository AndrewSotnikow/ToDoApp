import {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
} from 'react';
import { createClassName } from '#libraries/dom/createClassName';
import { createNameSpace } from '#libraries/dom/createNameSpace';
import { usePrevious } from '#components/hooks/usePrevious';
import type { InputRefs, InputProps } from './types';
import './styles.sass';

export const Input = forwardRef<InputRefs, InputProps>(({
  native = {},
}, ref) => {
  const {
    disabled = false,
    value,
  } = native;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>(value ? String(value) : '');
  const previousValue = usePrevious(value);

  useImperativeHandle(ref, () => ({
    inputRef,
    setValue: setInputValue,
    getValue: () => inputValue,
  }));

  useEffect(() => {
    const nValue = String(value);
    if (
      typeof previousValue !== 'undefined'
      && previousValue !== value
      && String(inputValue).trim() !== nValue.trim()
    ) {
      setInputValue(nValue);
    }
  }, [value, previousValue, inputValue]);

  const isEmpty = inputValue.trim().length < 1;

  return (
    <input
      {...native}
      ref={inputRef}
      type="text"
      autoComplete={native.autoComplete || 'off'}
      className={createClassName([
        ns.root(),
        disabled ? ns.child('disabled').value() : '',
        disabled ? 'disabled' : '',
        isEmpty ? ns.child('empty').value() : '',
        native.className || '',
      ])}
      value={inputValue}
      onInput={(e) => {
        setInputValue((e.target as HTMLInputElement).value);
        native?.onInput?.(e);
      }}
    />
  );
});

const ns = createNameSpace(Object.keys({ Input })[0]);
