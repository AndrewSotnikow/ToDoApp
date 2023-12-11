import {
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  PropsWithChildren,
} from 'react';
import { createClassName } from '#libraries/dom/createClassName';
import { createNameSpace } from '#libraries/dom/createNameSpace';
import type {
  ButtonRefs,
  ButtonProps,
  IconDirection,
} from './types';
import './styles.sass';

export const Button = forwardRef<ButtonRefs, PropsWithChildren<ButtonProps>>(({
  children,
  icon,
  iconPosition = 'left',
  native = {},
}, ref) => {
  const { disabled = false } = native;

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(ref, () => ({
    get buttonRef() {
      return buttonRef;
    },
  }));

  const getIcon = useCallback((
    position: IconDirection,
    isDisabled?: boolean,
  ) => {
    if (!icon) {
      return null;
    }
    return (
      <span
        aria-hidden={true}
        role="presentation"
        className={createClassName([
          ns('icon-wrapper', 'icon').value,
          ns.icon(position).value,
        ])}
        onClick={(e) => {
          if (isDisabled) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
      >
        {icon}
      </span>
    );
  }, [icon]);

  return (
    <button
      ref={buttonRef}
      {...native}
      className={createClassName([
        ns().root,
        ...(disabled ? [ns.input('disabled').value, 'disabled'] : []),
        native.className || '',
      ])}
    >
      {iconPosition === 'left' && getIcon(iconPosition, disabled)}
      <div
        role="presentation"
        aria-hidden={true}
        className={createClassName([
          ns('content').value,
        ])}
      >
        {children}
      </div>
      {iconPosition === 'right' && getIcon(iconPosition, disabled)}
    </button>
  );
});

const ns = createNameSpace(Object.keys({ Button })[0]);
