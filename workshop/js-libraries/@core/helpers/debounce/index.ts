import { DebounceReturnTuple, DebouncedFunction, TeardownFunction } from './types';

export function debounce<A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number
): DebounceReturnTuple<A, R> {
  let timer: ReturnType<typeof setTimeout>;

  const debouncedFunc: DebouncedFunction<A, R> = (args: A): Promise<R> =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(fn(args));
      }, ms);
    });

  const teardown: TeardownFunction = () => clearTimeout(timer);

  return [debouncedFunc, teardown];
}
