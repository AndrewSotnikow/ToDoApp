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
  CheckboxProps,
  CheckboxRefs,
} from './types';
import { usePrevious } from '#components/hooks/usePrevious';
import './styles.sass';

export const Checkbox = forwardRef<CheckboxRefs, CheckboxProps>(
  ({
    native = {},
    customIcon = {},
  }, ref) => {
    const {
      disabled, onChange, checked,
    } = native;
    const { checkedIcon, uncheckedIcon } = customIcon;
    const checkboxRef = useRef<HTMLInputElement>(null);
    const virtualCheckBoxRef = useRef<HTMLInputElement>(null);

    const [isChecked, setIsChecked] = useState(!!checked);
    const previousValue = usePrevious(checked);

    // usage of virtualCheckBoxRef?
    useImperativeHandle(ref, () => ({ checkboxRef, virtualCheckBoxRef, setValue: setIsChecked }));

    const onChangeHandlerInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setIsChecked(!isChecked);
      onChange?.(e);
    }, [onChange, isChecked]);

    const ariaDisabled = typeof native['aria-disabled'] !== 'undefined'
      ? native['aria-disabled']
      : disabled;

    // usage of this?
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
      <input
        ref={checkboxRef}
        {...native}
        type="checkbox"
        aria-disabled={ariaDisabled}
        onChange={disabled ? () => null : onChangeHandlerInput}
        checked={isChecked}
        disabled={disabled}
        className={createClassName([
          ns().root,
          disabled ? ns('disabled').value : '',
          checkedIcon ? ns('hide-default-checkbox').value : '',
        ])}
      />
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
    </div>
    );
  },
);

const ns = createNameSpace(Object.keys({ Checkbox })[0]);
