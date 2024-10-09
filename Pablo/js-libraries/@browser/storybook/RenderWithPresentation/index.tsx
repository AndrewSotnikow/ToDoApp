import { FC } from 'react';
import { StorybookRender } from '#libraries/@browser/storybook/StorybookRender';
import { RenderWithPresentationProps } from './types';

export const RenderWithPresentation: FC<RenderWithPresentationProps> = ({
  render,
}) => {
  const presentation = render(StorybookRender, 'storybook--component--presentation');
  const reactComponent = render(StorybookRender, 'storybook--component');

  return (
    <>
      <h4>Presentation</h4>
      {presentation}
      <br/>
      <h4>Component</h4>
      {reactComponent}
    </>
  );
};
