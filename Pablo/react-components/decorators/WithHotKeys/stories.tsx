import { MouseEvent } from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import { Button } from '#components/atoms/Button';
import { mapTypes } from '#libraries/types/mapTypes';
import { ButtonProps } from '#components/atoms/Button/types';
import { StorybookRender } from '#libraries/@browser/storybook/StorybookRender';
import type { StoryObj } from '@storybook/react';
import { getNative } from '#libraries/@browser/storybook/getNative';
import { createNameSpace } from '#libraries/dom/createNameSpace';
import { Spacer } from '#components/atoms/Spacer';
import { createClassName } from '#libraries/dom/createClassName';
import { WithHotKeys } from '.';

const displayName = Object.keys({ Button })[0];
const ns = createNameSpace(displayName);

const meta = {
  title: 'Decorators/WithHotKeys',
};

const defaultProps = {
  'native.onClick': (e: MouseEvent<HTMLButtonElement>) => {
    action('onClick')(e);
  },
} as ButtonProps;

export default meta;
type Story = StoryObj<typeof meta>;

const StyledDiv = styled.div`
  .${ns.root()} {
    padding: 6px 8px;
    text-align: center;
    border-radius: 5px;
  }
`;

export const Component: Story = {
  args: mapTypes(defaultProps),
  render: (props) => {
    const normalizedProps = {
      ...props,
      native: getNative(props),
    };
    return (
      <StorybookRender
        Component={(decoratorProps: any) => {
          return (
            <StyledDiv>
              <div>Button with <b><i>{Object.keys({ WithHotKeys })[0]}</i></b> decorator</div>
              <Spacer height={8} />
              <WithHotKeys
                keyMappings={[{
                  isMatched: (e) => e.ctrlKey && e.key === 'Enter',
                  action: () => alert('Clicked by Hot Keys'),
                }]}
              >
                {({ elementRef }) => {
                  return (
                    <Button
                      ref={(refs) => {
                        if (refs?.buttonRef?.current) {
                          elementRef.current = refs.buttonRef.current;
                        }
                      }}
                      native={{
                        ...(decoratorProps.native || {}),
                        className: createClassName([
                          'theme-blue',
                          decoratorProps?.native?.className || '',
                        ]),
                      }}
                    >Press Ctrl + Enter</Button>
                  );
                }}
              </WithHotKeys>
            </StyledDiv>
          );
        }}
        componentProps={normalizedProps}
      />
    );
  },
};
