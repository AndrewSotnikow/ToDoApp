import {
  // CSSProperties,
  ChangeEvent,
  forwardRef,
  useCallback,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
} from 'react';
import { createClassName } from '#libraries/dom/createClassName';
import { createNameSpace } from '#libraries/dom/createNameSpace';
import type { CheckboxProps,
  CheckboxRefs } from './types';
import { usePrevious } from '#components/hooks/usePrevious';
import './styles.sass';


export const CheckBox = forwardRef<CheckboxRefs, CheckboxProps>(
  ({
            native = {},
     CheckedIcon, UncheckedIcon
           }, ref, ) => {
  const {
    disabled, onChange , checked
  } = native;

  const checkboxRef = useRef<HTMLInputElement>(null);
  const virtualCheckBoxRef = useRef<HTMLInputElement>(null);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const previousValue = usePrevious(checked);

  useImperativeHandle(ref, () => ({ checkboxRef, virtualCheckBoxRef, setValue: setIsChecked }));

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onChange && onChange(e);
  }, [onChange]);


  const ariaDisabled = typeof native['aria-disabled'] !== 'undefined'
    ? native['aria-disabled']
    : disabled;

    useEffect(() => {
      if (
        typeof previousValue !== 'undefined'
        && previousValue !== checked
      ) {
        setIsChecked(checked as boolean);
      }
    }, [checked, previousValue]);

  return (
    <>
      <input
        ref={checkboxRef}
        {...native}
        type="checkbox"
        aria-disabled={ariaDisabled}
        onChange={disabled ? () => null : onChangeHandler}
        checked={isChecked}
        disabled={disabled}
        className={createClassName([
          ns().root
        ])}
      />
      {checked && typeof CheckedIcon  === 'string' && <img
      //   className={createClassName([
      //   disabled ? ns('disabled').value : '',
      //   ns('checked').value,
      //   native.className || '',
      // ])}
        src={CheckedIcon} alt='checkbox is checked'/>}
      {checked && typeof CheckedIcon  === 'function' && CheckedIcon}

      {!checked && typeof UncheckedIcon  === 'string' && <img
      //   className={createClassName([
      //   disabled ? ns('disabled').value : '',
      //   ns('unchecked').value,
      //   native.className || '',
      // ])}
        src={UncheckedIcon} alt='checkbox is not checked'/>}
      {!checked && typeof UncheckedIcon  === 'function' && UncheckedIcon}
  </>
  );
});

const ns = createNameSpace(Object.keys({ CheckBox })[0]);
