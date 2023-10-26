import {
  PropsWithChildren, forwardRef, useRef, useImperativeHandle,
} from 'react';
import { createClassName } from '#libraries/dom/createClassName';
import { ButtonProps, ButtonRefs } from './types';
import './styles.sass';

export const Button = forwardRef<ButtonRefs, PropsWithChildren<ButtonProps>>(({
  native = {},
  icon = null,
  iconPosition = 'left',
  children,
}, ref) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(ref, () => {
    return {
      buttonRef,
    };
  });

  return (
    <button
      {...native}
      ref={buttonRef}
      className={createClassName([
        'button',
        native?.disabled ? 'button--disabled' : '',
        native?.disabled ? 'disabled' : '',
      ])}
    >
      <>
        {iconPosition === 'left' && { icon }}
        {children}
        {iconPosition === 'right' && { icon }}
      </>
    </button>
  );
});
