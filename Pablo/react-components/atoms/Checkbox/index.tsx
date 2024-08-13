import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  ChangeEvent,
  FocusEvent,
} from 'react';
import { createClassName } from '#libraries/dom/createClassName';
import { createNameSpace } from '#libraries/dom/createNameSpace';
import { usePrevious } from '#components/hooks/usePrevious';
import type { CheckboxRefs, CheckboxProps } from './types';
import './styles.sass';

export const Checkbox = forwardRef<CheckboxRefs, CheckboxProps>(({
  checkIcon,
  uncheckIcon,
  native = {},
}, ref) => {
  const {
    disabled = false,
    checked = false,
    onChange,
    onFocus,
    onBlur,
  } = native;

  const [isChecked, setIsChecked] = useState(native.checked);
  const [isFocused, setIsFocused] = useState(false);

  const previousValue = usePrevious(native.checked);

  const checkboxRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({ checkboxRef, setIsChecked, setIsFocused }));

  useEffect(() => {
    if (
      typeof previousValue !== 'undefined'
      && previousValue !== checked
      && checked !== isChecked
    ) {
      setIsChecked(checked);
    }
  }, [checked, isChecked, previousValue]);

  const onFocusHandler = useCallback((e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  }, [onFocus]);

  const onBlurHandler = useCallback((e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  }, [onBlur]);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked((prevValue) => {
      return !prevValue;
    });
    onChange?.(e);
  }, [onChange]);

  const isNativeIcon = !checkIcon || !uncheckIcon;

  const icon = isNativeIcon
    ? null
    : isChecked
      ? checkIcon
      : uncheckIcon;

  return (
    <span
      className={createClassName([
        ns.root(),
        ...(isChecked ? [ns.child('checked').value(), 'checked'] : []),
        ...(disabled ? [ns.child('disabled').value(), 'disabled'] : []),
        isFocused ? ns.child('focused').value() : '',
        isNativeIcon ? ns.child('native-icon').value() : '',
        native.className || '',
      ])}
    >
      <input
        {...native}
        ref={checkboxRef}
        type="checkbox"
        className={createClassName([
          ns.child('input', 'input').value(),
          isNativeIcon ? ns.get('input').child('native-icon').value() : '',
          isChecked ? ns.get('input').child('checked').value() : '',
          disabled ? ns.get('input').child('disabled').value() : '',
          native.className || '',
        ])}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        checked={isChecked}
      />
      <span
        role="presentation"
        aria-hidden={true}
        className={createClassName([
          ns.child('icon').value(),
        ])}
      >
        {icon}
      </span>
    </span>
  );
});

const ns = createNameSpace(Object.keys({ Checkbox })[0]);
