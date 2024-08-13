import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import type { StoryObj } from '@storybook/react';
import { StorybookRender } from '#libraries/@browser/storybook/StorybookRender';
import { getNative } from '#libraries/@browser/storybook/getNative';
import { createClassName } from '#libraries/dom/createClassName';
import { createNameSpace } from '#libraries/dom/createNameSpace';
import { Spacer } from '#components/atoms/Spacer';
import { InputProps } from './types';
import { Input } from '.';

const displayName = Object.keys({ Input })[0];
const ns = createNameSpace(displayName);

const meta = {
  title: 'Atoms/Input',
  component: Input,
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  'native.onChange': (e: ChangeEvent<HTMLInputElement>) => {
    action('onChange')(e);
    action('onChange[e.target.value]')(String(e.target.value));
  },
  'native.onInput': (e: ChangeEvent<HTMLInputElement>) => {
    action('onInput')(e);
    action('onInput[e.target.value]')(String(e.target.value));
  },
  'native.value': 'input-value',
  'native.className': '',
  'native.disabled': false,
} as InputProps;

const StyledDiv = styled.div`
  & > label {
    display: inline-block;
    margin-bottom: 10px;
  }

  .${ns.root()} {
    padding: 6px 8px;
    width: 70px;
    text-align: center;
    border-radius: 5px;
    margin-right: 10px;
  }
`;

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
      Component={Input}
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
      ]),
      'aria-label': 'Input',
    },
  };
  return (
    <StyledDiv>
      <StorybookRender
        Component={(inputProps: InputProps) => {
          return (
            <div>
              <div aria-hidden={true}>
                Text input:
              </div>
              <Spacer height={6} />
              <Input {...inputProps} />
            </div>
          );
        }}
        componentProps={normalizedProps}
      />
    </StyledDiv>
  );
};
