import {
  forwardRef, useImperativeHandle, useRef, useState, useEffect, CSSProperties,
} from 'react';
import { InputProps, InputRef } from './types';
import { createClassName } from '#libraries/dom/createClassName';
import { debounce } from '#libraries/@core/helpers/debounce';
import { createNameSpace } from '#libraries/@core/dom/createNameSpace';
import { getElementWidthWithoutPaddings } from '#libraries/dom/getElementWidthWithoutPaddings';

const virtualInputStyles: CSSProperties = {
  position: 'absolute',
  opacity: 0,
  boxSizing: 'border-box',
  pointerEvents: 'none',
  top: -999999,
  left: -999999,
  whiteSpace: 'pre',
};

// TODO
// continue develop component
// add debounce
// add createNameSpace
export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    native = {},
    // debounceMs = 0,
  } = props;
  const { disabled = false, value = '', checked = false } = native;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const virtualInputRef = useRef<HTMLSpanElement | null>(null);
  const [inputValue, setInputValue] = useState<string>(value as string);
  const [isDynamicWidth, setIsDynamicWidth] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    inputRef,
  }));

  const ariaHidden = typeof native['aria-hidden'] !== 'undefined'
    ? native['aria-hidden']
    : disabled;

  useEffect(() => {
    if (getElementWidthWithoutPaddings(inputRef.current) > 0) {
      return () => {};
    }
    setIsDynamicWidth(true);

    // TODO finish
    virtualInput.style.fontSize = computedInputStyles.fontSize;
    virtualInput.style.fontFamily = computedInputStyles.fontFamily;
    virtualInput.style.fontStyle = computedInputStyles.fontStyle;
    virtualInput.style.letterSpacing = computedInputStyles.letterSpacing;
    virtualInput.style.textTransform = computedInputStyles.textTransform;
    virtualInput.style.fontWeight = computedInputStyles.fontWeight;
  }, [isDynamicWidth]);

  return (
    <>
      <input
        ref={inputRef}
        autoComplete="off"
        {...native}
        aria-hidden={ariaHidden}
        // TODO debounce not working with fire event in tests
        // onChange={(e) => debounce(() => native?.onChange?.(e), debounceMs)}
        onChange={(e) => {
          setInputValue(e.target.value);
          native?.onChange?.(e);
        }}
        type="text"
        value={inputValue}
        className={createClassName([
          ns().root,
          ...(disabled ? [ns.input('disabled').value, 'disabled'] : []),
          ...(checked ? [ns.input('checked').value, 'checked'] : []),
        ])}
      />
      {isDynamicWidth && <span ref={virtualInputRef} style={virtualInputStyles}>
        {inputValue}
      </span>}
    </>
  );
});

const ns = createNameSpace(Object.keys({ Input })[0]);
