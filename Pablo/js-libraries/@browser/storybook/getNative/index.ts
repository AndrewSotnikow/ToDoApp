import { HTMLAttributes } from 'react';
import { createClassName } from '#libraries/@core/dom/createClassName';

export const getNative = (props: any): HTMLAttributes<HTMLElement> => {
  const { native = {} } = props;
  return {
    ...native,
    onClick: native.onClick || props['native.onClick'],
    onInput: native.onInput || props['native.onInput'],
    onChange: native.onChange || props['native.onChange'],
    disabled: native.disabled || props['native.disabled'],
    checked: native.checked || props['native.checked'],
    value: native.value || props['native.value'],
    'aria-disabled': native['aria-disabled'] || props['native.ariaDisabled'],
    'aria-checked': native['aria-checked'] || props['native.ariaChecked'],
    className: createClassName([
      props['native.className'] as string,
      native.className || '',
    ]),
  };
};
