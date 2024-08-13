import {
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import { WithHotKeysProps, WithHotKeysRefs } from './types';

const createHandler = (
  keyMappings: Required<WithHotKeysProps>['keyMappings'],
): Required<WithHotKeysProps>['keyMappings'][0]['action'] => {
  return (e) => {
    (keyMappings || []).forEach(({ isMatched, action }) => {
      if (isMatched(e)) {
        action(e);
      }
    });
  };
};

export const WithHotKeys = forwardRef<
  WithHotKeysRefs,
  WithHotKeysProps
>(({
  keyMappings = [],
  children,
}, refs) => {
  const elementRef = useRef<HTMLElement | null>(null);

  useImperativeHandle(refs, () => {
    return {
      elementRef,
    };
  });

  useEffect(() => {
    const grouppedMappings = (keyMappings || [])
      .reduce((grouped, mapping) => {
        const { type = 'keydown', listenOn = 'document' } = mapping;
        const mappingsByTypes = grouped.get(listenOn) || new Map();
        const mappings = mappingsByTypes.get(type) || [];

        mappings.push(mapping);
        mappingsByTypes.set(type, mappings);
        grouped.set(listenOn, mappingsByTypes);

        return grouped;
      }, new Map<
        Required<Required<WithHotKeysProps>['keyMappings'][0]>['listenOn'],
        Map<
          Required<Required<WithHotKeysProps>['keyMappings'][0]>['type'],
          Required<WithHotKeysProps>['keyMappings']
        >
      >());

    const unsubscribeHandlers: (() => void)[] = [];

    grouppedMappings.get('document')?.forEach((mappings, type) => {
      const handler = createHandler(mappings);
      document.addEventListener(type, handler);
      unsubscribeHandlers.push(() => document.removeEventListener(type, handler));
    });

    grouppedMappings.get('self')?.forEach((mappings, type) => {
      const handler = createHandler(mappings);
      elementRef.current?.addEventListener(type, handler);
    });

    return () => {
      unsubscribeHandlers.forEach((unsubscribe) => unsubscribe());
    };
  }, [keyMappings]);

  return (
    <>
      {children({ elementRef })}
    </>
  );
});
