// TODO is show using case of decorator
// delete this file after understanding how it works
import { Input } from "#components/atoms/Input";
import { WithContentWidth } from './index';
import { useRef } from 'react';

export const DynamicInput = (props : any) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <WithContentWidth
      {...props}
      content={props.native.value}
      prepare={(virtualElem: HTMLElement) => {
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
            ref={(refs) => {
              if (refs?.inputRef.current) {
                childRef.current = refs.inputRef.current;
                inputRef.current = refs.inputRef.current;
              }
            }}
            {...props}
            native={{
              onInput: (e) => {
                const newValue = (e.target as HTMLInputElement).value;
                setContent(newValue);
                props.native?.onInput?.(e);
              },
            }}
          />
        );
      }}
    </WithContentWidth>
  );
};

/*
function foo(a, b, c) {}

<Button> Hello Button</Button> //  -> button
<Button href='#'> Hello Button</Button> //  -> a

<Button>
  <a>Hello Button</a>
</Button> //  -> button

//

*/


