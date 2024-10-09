import { ReactNode } from 'react';

export type WithDependedChildren<ComponentProps, ChildrenProps = any> = ComponentProps & {
  children: (props: ChildrenProps) => ReactNode;
};
