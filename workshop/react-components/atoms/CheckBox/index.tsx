import {
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
import type {
  CheckBoxProps,
  CheckBoxRefs,
} from './types';
import { usePrevious } from '#components/hooks/usePrevious';
import './styles.sass';

export const Checkbox = forwardRef<CheckBoxRefs, CheckBoxProps>(
  ({
    native = {},
    checkedIcon, uncheckedIcon,
  }, ref) => {
    const {
      disabled, onChange, checked,
    } = native;

    const CheckBoxRef = useRef<HTMLInputElement>(null);
    const virtualCheckBoxRef = useRef<HTMLInputElement>(null);

    const [isChecked, setIsChecked] = useState(!!checked);
    const previousValue = usePrevious(checked);

    useImperativeHandle(ref, () => ({ CheckBoxRef, virtualCheckBoxRef, setValue: setIsChecked }));

    const onChangeHandlerInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setIsChecked(!isChecked);
      onChange?.(e);
    }, [onChange, isChecked]);

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
    <div className={createClassName([ns('input-container').value])}>
      <span>{ !disabled && isChecked && checkedIcon && checkedIcon }</span>
      <span>{ !disabled && !isChecked && uncheckedIcon && uncheckedIcon }</span>
      <span className={createClassName([
        ns().root,
        disabled ? ns('disabled').value : '',
        checkedIcon ? ns('hide-default-checkbox').value : '',
      ])}
      >
        { disabled && uncheckedIcon && uncheckedIcon }
      </span>

      <input
        ref={CheckBoxRef}
        {...native}
        type="checkbox"
        aria-disabled={ariaDisabled}
        onChange={disabled ? () => null : onChangeHandlerInput}
        checked={isChecked}
        disabled={disabled}
        className={createClassName([
          ns().root,
          disabled ? ns('disabled').value : '',
          (checkedIcon || uncheckedIcon) ? ns('hide-default-checkbox').value : '',
        ])}
      />
    </div>
    );
  },
);

const ns = createNameSpace(Object.keys({ Checkbox })[0]);
