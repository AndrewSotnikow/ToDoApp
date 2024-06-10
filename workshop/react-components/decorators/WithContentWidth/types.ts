import { ReactNode, HTMLAttributes, MutableRefObject } from 'react';

export type WithContentWidthProps = WithDependedChildren<
  {
    content: ReactNode;
    prepare: (virtualElem: HTMLDivElement) => void;
    native?: HTMLAttributes<HTMLDivElement>;
  },
  {
    setContent: (content: ReactNode) => void;
    childRef: MutableRefObject<HTMLElement | null>;
  }
>;

export type WithContentWidthRefs = {};


// TODO it's common iterface move to js-libraries after undestanding how it works
export type WithDependedChildren<ComponentProps, ChildrenProps = any> = ComponentProps & {
  children: (props: ChildrenProps) => ReactNode;
};
