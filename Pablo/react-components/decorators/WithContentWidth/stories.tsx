import styled from 'styled-components';
import { useRef, ChangeEvent } from 'react';
import { WithContentWidth } from './index';
import { mapTypes } from '#libraries/types/mapTypes';
import { action } from '@storybook/addon-actions';
import type { StoryObj } from '@storybook/react';
import { StorybookRender } from '#libraries/@browser/storybook/StorybookRender';
import { getNative } from '#libraries/@browser/storybook/getNative';
import { createNameSpace } from '#libraries/dom/createNameSpace';
import { createClassName } from '#libraries/dom/createClassName';
import { Input } from '#components/atoms/Input';
import { InputProps } from '#components/atoms/Input/types';
import { Spacer } from '#components/atoms/Spacer';

const displayName = Object.keys({ Input })[0];
const ns = createNameSpace(displayName);

const meta = {
  title: 'Decorators/WithContentWidth',
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  'native.className': '',
  'native.value': 'input-value',
  'native.onChange': (e: ChangeEvent<HTMLInputElement>) => {
    action('onChange')(e);
    action('onChange[e.target.value]')(String(e.target.value));
  },
  'native.onInput': (e: ChangeEvent<HTMLInputElement>) => {
    action('onInput')(e);
    action('onInput[e.target.value]')(String(e.target.value));
  },
} as InputProps;

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
          const inputRef = useRef<HTMLInputElement | null>(null);
          return (
            <StyledDiv>
              <div>Text input with <b><i>{Object.keys({
                WithContentWidth,
              })[0]}</i></b> decorator</div>
              <div>has width by its <b><i>content (dynamic)</i></b></div>
              <Spacer height={8} />
              <WithContentWidth
                {...decoratorProps}
                content={decoratorProps.native.value}
                prepare={(virtualElem) => {
                  const input = inputRef.current;
                  if (!input) {
                    return;
                  }
                  const computedInputStyles = window.getComputedStyle(input, null);
                  virtualElem.style.fontSize = computedInputStyles.fontSize;
                  virtualElem.style.padding = computedInputStyles.padding;
                  virtualElem.style.fontFamily = computedInputStyles.fontFamily;
                  virtualElem.style.fontStyle = computedInputStyles.fontStyle;
                  virtualElem.style.letterSpacing = computedInputStyles.letterSpacing;
                  virtualElem.style.textTransform = computedInputStyles.textTransform;
                  virtualElem.style.fontWeight = computedInputStyles.fontWeight;
                }}
              >
                {({ setContent, childRef }) => {
                  return (
                    <Input
                      {...decoratorProps}
                      ref={(refs) => {
                        if (refs?.inputRef.current) {
                          childRef.current = refs.inputRef.current;
                          inputRef.current = refs.inputRef.current;
                        }
                      }}
                      native={{
                        ...(decoratorProps.native || {}),
                        className: createClassName([
                          'theme-blue',
                        ]),
                        onInput: (e) => {
                          const newValue = (e.target as HTMLInputElement).value;
                          setContent(newValue);
                          decoratorProps.native?.onInput?.(e);
                        },
                      }}
                    />
                  );
                }}
              </WithContentWidth>
            </StyledDiv>
          );
        }}
        componentProps={normalizedProps}
      />
    );
  },
};
