import { PropsWithChildren, forwardRef } from 'react';
import { ButtonProps, ButtonRefs } from './types';
import './styles.sass';

export const Button = forwardRef<ButtonRefs, PropsWithChildren<ButtonProps>>(({
  native = {},
  icon = null,
  iconPosition = 'left',
  children,
}, ref) => {

  return (
    <button
      {...native}
      ref={ref}
      class="button"
    >
      {iconPosition === 'left' && {icon}}
      {children}
      {iconPosition === 'right' && {icon}}
    </button>
  );
});
