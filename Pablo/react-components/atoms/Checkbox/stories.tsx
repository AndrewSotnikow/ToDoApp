import styled from 'styled-components';
import { ChangeEvent } from 'react';
import { action } from '@storybook/addon-actions';
import { createClassName } from '#libraries/dom/createClassName';
import type { Meta, StoryObj } from '@storybook/react';
import { mapTypes } from '#libraries/types/mapTypes';
import { StorybookRender } from '#libraries/@browser/storybook/StorybookRender';
import { getNative } from '#libraries/@browser/storybook/getNative';
import { createNameSpace } from '#libraries/dom/createNameSpace';
import { CrossIcon } from '#components/icons/CrossIcon';
import { CheckIcon } from '#components/icons/CheckIcon';
import { Checkbox } from '.';
import { CheckboxProps } from './types';

const displayName = Object.keys({ Checkbox })[0];
const ns = createNameSpace(displayName);

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  argTypes: mapTypes({
    checkIcon: {
      options: ['icon', 'text', 'unset'],
      mapping: {
        icon: <CheckIcon />,
        text: '☑',
        unset: undefined,
      },
      control: { type: 'radio' },
    },
    uncheckIcon: {
      options: ['icon', 'text', 'unset'],
      mapping: {
        icon: <CrossIcon />,
        text: '☐',
        unset: undefined,
      },
      control: { type: 'radio' },
    },
  }),
} satisfies Meta<CheckboxProps>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  checkIcon: 'icon',
  uncheckIcon: 'icon',
  'native.disabled': false,
  'native.checked': false,
  'native.className': '',
  'native.onChange': (e: ChangeEvent<HTMLInputElement>) => {
    action('onChange')(e);
    action('onChange[e.target.checked]')(String(e.target.checked));
  },
} as CheckboxProps;

export const Component: Story = {
  args: defaultProps,
  render: (props) => <RawComponent {...props} />,
};

export const Presentation: Story = {
  args: defaultProps,
  render: (props) => <PresentationComponent {...props} />,
};

const StyledDiv = styled.div`
  label {
    user-select: none;
    display: inline-flex;
    align-items: center;

    .${ns.root()} {
      width: 16px;
      height: 16px;
      font-size: 30px;
      margin-right: 5px;

      .${ns.child('icon').value()} {
        svg {
          fill: white;
        }
      }
    }
  }
`;

const RawComponent = (props: any) => {
  const normalizedProps = {
    ...props,
    native: getNative(props),
  };
  return (
    <StorybookRender
      Component={Checkbox}
      componentProps={normalizedProps}
    />
  );
};

const PresentationComponent = (props: any) => {
  const normalizedProps = {
    ...props,
    native: {
      ...(props as CheckboxProps).native,
      className: createClassName([
        'theme-blue',
      ]),
      'aria-label': 'Checkbox',
    },
  };
  return (
    <StyledDiv>
      <StorybookRender
        Component={(checkboxProps: CheckboxProps) => {
          return (
            <label>
              <Checkbox {...checkboxProps} />
              <span>{displayName}</span>
            </label>
          );
        }}
        componentProps={normalizedProps}
      />
    </StyledDiv>
  );
};
