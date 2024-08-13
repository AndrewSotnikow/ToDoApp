import { ReactNode, HTMLAttributes, MutableRefObject } from 'react';
import { WithDependedChildren } from '#libraries/@interfaces';

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
