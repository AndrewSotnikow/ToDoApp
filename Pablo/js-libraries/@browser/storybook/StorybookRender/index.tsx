import { getNative } from '#libraries/@browser/storybook/getNative';
import { StorybookRenderProps } from './types';

export const StorybookRender = (props: StorybookRenderProps): any => {
  const { Component, componentProps } = props;
  const { children, ...rest } = componentProps;

  return (
    <div className='storybook--component--presentation'>
      {children
        ? (
          <Component {...rest} native={getNative(rest)}>
            {children}
          </Component>
        )
        : (
          <Component {...rest} native={getNative(rest)} />
        )}
    </div>
  );
};
