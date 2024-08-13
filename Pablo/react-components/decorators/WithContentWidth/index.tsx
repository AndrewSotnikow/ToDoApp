import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { createClassName } from '#libraries/dom/createClassName';
import { createNameSpace } from '#libraries/dom/createNameSpace';
import { WithContentWidthProps, WithContentWidthRefs } from './types';
import './styles.sass';

export const WithContentWidth = forwardRef<
  WithContentWidthRefs,
  WithContentWidthProps
>(({
  native = {},
  children,
  prepare,
  ...otherProps
}, refs) => {
  const virtualElemRef = useRef<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLElement | null>(null);
  const [content, setContent] = useState<ReactNode>(otherProps.content || null);

  useImperativeHandle(refs, () => {
    return { childRef, virtualElemRef };
  });

  useEffect(() => {
    const virtualElement = virtualElemRef.current;

    if (!virtualElement) {
      return () => {};
    }

    prepare(virtualElement);

    const observer = new ResizeObserver(() => {
      const childElement = childRef.current;
      if (!childElement || !virtualElement) {
        return;
      }
      childElement.style.width = `${virtualElement.getBoundingClientRect().width}px`;
    });
    observer.observe(virtualElement);

    return () => observer.disconnect();
  }, [prepare, setContent]);

  return (
    <>
      {children({ setContent, childRef })}
      <div
        {...native}
        ref={virtualElemRef}
        className={createClassName([
          // 'hidden',
          ns.child('virtual-element').value(),
          native.className || '',
        ])}
      >
        {content}
      </div>
    </>
  );
});

const ns = createNameSpace(Object.keys({ WithContentWidth })[0]);
