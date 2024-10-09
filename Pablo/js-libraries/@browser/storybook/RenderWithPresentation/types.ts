import { FC, ReactNode } from 'react';
import { StorybookRenderProps } from '#libraries/@browser/storybook/StorybookRender/types';

export type RenderWithPresentationProps = {
  render: (
    Render: FC<StorybookRenderProps>,
    type: 'storybook--component--presentation' | 'storybook--component'
  ) => ReactNode;
}
