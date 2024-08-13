import {
  useRef,
  forwardRef,
  useImperativeHandle,
  PropsWithChildren,
} from 'react';
import { createClassName } from '#libraries/dom/createClassName';
import { createNameSpace } from '#libraries/dom/createNameSpace';
import type {
  ButtonRefs,
  ButtonProps,
} from './types';
import './styles.sass';

export const Button = forwardRef<ButtonRefs, PropsWithChildren<ButtonProps>>(({
  children,
  native = {},
}, ref) => {
  const {
    disabled = false,
  } = native;
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(ref, () => ({
    get buttonRef() {
      return buttonRef;
    },
  }));

  return (
    <button
      {...native}
      ref={buttonRef}
      className={createClassName([
        ns.root(),
        ...(disabled ? [ns.child('disabled').value(), 'disabled'] : []),
        native.className || '',
      ])}
    >
      <div
        role="presentation"
        aria-hidden={true}
        className={createClassName([ns.child('content').value()])}
      >
        {children}
      </div>
    </button>
  );
});

const ns = createNameSpace(Object.keys({ Button })[0]);
