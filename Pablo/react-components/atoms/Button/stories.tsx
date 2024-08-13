import styled from 'styled-components';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { createClassName } from '#libraries/dom/createClassName';
import { createNameSpace } from '#libraries/dom/createNameSpace';
import { mapTypes } from '#libraries/types/mapTypes';
import { StorybookRender } from '#libraries/@browser/storybook/StorybookRender';
import { getNative } from '#libraries/@browser/storybook/getNative';
import { Button } from '.';
import { ButtonProps } from './types';

const displayName = Object.keys({ Button })[0];
const ns = createNameSpace(displayName);

const StyledDiv = styled.div`
  .${ns.root()} {
    border-radius: 5px;
    user-select: none;
    padding: 10px;
  }
`;

const meta = {
  title: 'Atoms/Button',
  component: mapTypes(Button),
  argTypes: mapTypes({
    'native.onClick': { action: 'onClick' },
  }),
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  children: displayName,
  'native.disabled': false,
  'native.className': '',
  'native.onClick': fn(),
} as ButtonProps;

export const Component: Story = {
  args: defaultProps,
  render: (props) => <RawComponent {...props} />,
};

export const Presentation: Story = {
  args: defaultProps,
  render: (props) => <PresentationComponent {...props} />,
};

const RawComponent = (props: any) => {
  const normalizedProps = {
    ...props,
    native: getNative(props),
  };
  return (
    <StorybookRender
      Component={Button}
      componentProps={normalizedProps}
    />
  );
};

const PresentationComponent = (props: any) => {
  const normalizedProps = {
    ...props,
    native: {
      ...props.native,
      className: createClassName([
        'theme-blue',
        'btn-animation',
      ]),
      'aria-label': 'My Button',
    },
  };
  return (
    <StyledDiv>
      <StorybookRender
        Component={Button}
        componentProps={normalizedProps}
      />
    </StyledDiv>
  );
};
