import {
  CSSProperties,
  ChangeEvent,
  KeyboardEvent,
  forwardRef,
  useCallback,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
  useMemo,
} from 'react';
import { createClassName } from '#libraries/dom/createClassName';
import { createNameSpace } from '#libraries/dom/createNameSpace';
import { getElementWidthWithoutPaddings } from '#libraries/dom/getElementWidthWithoutPaddings';
import type { InputRefs, InputProps } from './types';
import { usePrevious } from '#components/hooks/usePrevious';
import { debounce } from '#libraries/timings/debounce';
import './styles.sass';

const virtualInputStyles: CSSProperties = {
  position: 'absolute',
  opacity: 0,
  boxSizing: 'border-box',
  pointerEvents: 'none',
  top: -999999,
  left: -999999,
  whiteSpace: 'pre',
};

export const Input = forwardRef<InputRefs, InputProps>(({
  native = {},
  debounceMs = 0,
}, ref) => {
  const {
    disabled, onChange, value, onKeyDown,
  } = native;

  const inputRef = useRef<HTMLInputElement>(null);
  const virtualInputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState<string>(value ? String(value) : '');
  const [isDynamicWidth, setIsDynamicWidth] = useState(false);
  const previousValue = usePrevious(value);

  useImperativeHandle(ref, () => ({ inputRef, virtualInputRef, setValue: setInputValue }));

  const debouncedOnChange = useMemo(
    () => debounce(onChange || (() => {}), debounceMs),
    [debounceMs, onChange],
  );

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedOnChange(e);
  }, [debouncedOnChange]);

  const onKeyDownHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
      return;
    }
    if (e.key === 'Enter') {
      inputRef.current!.blur();
    }
  }, [onKeyDown]);

  useEffect(() => {
    if (getElementWidthWithoutPaddings(inputRef.current) > 0) {
      return () => {};
    }
    setIsDynamicWidth(true);

    if (!virtualInputRef.current) {
      return () => {};
    }
    const virtualInput = virtualInputRef.current;
    const input = inputRef.current as HTMLInputElement;
    const computedInputStyles = window.getComputedStyle(input, null);

    virtualInput.style.fontSize = computedInputStyles.fontSize;
    virtualInput.style.fontFamily = computedInputStyles.fontFamily;
    virtualInput.style.fontStyle = computedInputStyles.fontStyle;
    virtualInput.style.letterSpacing = computedInputStyles.letterSpacing;
    virtualInput.style.textTransform = computedInputStyles.textTransform;
    virtualInput.style.fontWeight = computedInputStyles.fontWeight;

    const observer = new ResizeObserver(() => {
      input.style.width = `${virtualInput.getBoundingClientRect().width}px`;
    });
    observer.observe(virtualInput);

    return () => observer.disconnect();
  }, [isDynamicWidth]);

  useEffect(() => {
    if (
      typeof previousValue !== 'undefined'
      && previousValue !== value
      && String(inputValue).trim() !== String(value).trim()
    ) {
      setInputValue(String(value));
    }
  }, [value, previousValue, inputValue]);

  const ariaDisabled = typeof native['aria-disabled'] !== 'undefined'
    ? native['aria-disabled']
    : disabled;

  const isEmpty = inputValue.trim().length < 1;

  return (
    <>
      <input
        ref={inputRef}
        {...native}
        type="text"
        autoComplete="off"
        aria-disabled={ariaDisabled}
        className={createClassName([
          ns().root,
          disabled ? ns('disabled').value : '',
          disabled ? 'disabled' : '',
          isEmpty ? ns('empty').value : '',
          native.className || '',
        ])}
        onBlur={(e) => {
          setInputValue(inputValue.trim());
          native?.onBlur?.(e);
        }}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        value={inputValue}
      />
      {isDynamicWidth && (
        <span
          role="presentation"
          aria-hidden={true}
          ref={virtualInputRef}
          className={createClassName([
            ns('virtual-input', 'virtual').value,
            disabled ? ns.virtual('disabled').value : '',
            native.className || '',
          ])}
          style={virtualInputStyles}
        >
          {inputValue}
        </span>
      )}
    </>
  );
});

const ns = createNameSpace(Object.keys({ Input })[0]);
