import { FC } from 'react';
import { SpacerProps } from './types';
import { createNameSpace } from '#libraries/dom/createNameSpace';
import { createClassName } from '#libraries/dom/createClassName';

export const Spacer: FC<SpacerProps> = ({ height }) => <div
  className={createClassName([
    ns.root(),
  ])}
  style={{ height }}
/>;

const ns = createNameSpace(Object.keys({ Spacer })[0]);
