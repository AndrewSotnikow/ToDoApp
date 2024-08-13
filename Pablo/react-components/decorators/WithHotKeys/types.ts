import { MutableRefObject } from 'react';
import { KeyboardEventKey } from 'keyboard-event-key-type';
import { WithDependedChildren } from '#libraries/@interfaces';

export type WithHotKeysProps = WithDependedChildren<
  {
    keyMappings?: {
      isMatched: (event: KeyboardEvent & { key: KeyboardEventKey }) => boolean;
      action: (event: KeyboardEvent) => void;
      type?: 'keydown' | 'keypress' | 'keyup';
      listenOn?: 'document' | 'self';
    }[];
  },
  {
    elementRef: WithHotKeysRefs['elementRef'];
  }
>;

export type WithHotKeysRefs = {
  elementRef: MutableRefObject<HTMLElement | null>;
};
