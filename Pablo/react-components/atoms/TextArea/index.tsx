import {
  forwardRef, useState, useRef, useImperativeHandle, useEffect,
} from 'react';
import { createClassName } from '#libraries/dom/createClassName';
import { createNameSpace } from '#libraries/dom/createNameSpace';
import { usePrevious } from '#components/hooks/usePrevious';
import { TextAreaRefs, TextAreaProps } from './types';
import './styles.sass';

export const TextArea = forwardRef<TextAreaRefs, TextAreaProps>(({
  native = {},
}, refs) => {
  const {
    onChange, value, disabled,
  } = native;
  const [textAreaValue, setTextAreaValue] = useState<string>(value ? String(value) : '');
  const previousValue = usePrevious(value);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(refs, () => ({
    textAreaRef,
    setValue: setTextAreaValue,
  }));

  useEffect(() => {
    if (
      typeof previousValue !== 'undefined'
      && previousValue !== value
      && String(textAreaValue).trim() !== String(value).trim()
    ) {
      setTextAreaValue(String(value));
    }
  }, [value, disabled, previousValue, textAreaValue]);

  const isEmpty = textAreaValue.trim().length < 1;

  return (
    <textarea
      ref={textAreaRef}
      {...native}
      className={createClassName([
        ns.root(),
        native.className || '',
        disabled ? ns.child('disabled').value() : '',
        disabled ? 'disabled' : '',
        isEmpty ? ns.child('empty').value() : '',
      ])}
      onChange={(e) => {
        setTextAreaValue(e.target.value);
        onChange?.(e);
      }}
      value={textAreaValue}
      disabled={disabled}
    />
  );
});

const ns = createNameSpace(Object.keys({ TextArea })[0]);
