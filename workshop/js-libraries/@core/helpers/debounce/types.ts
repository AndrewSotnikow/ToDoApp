export type DebounceArgumentType<A> = A;

export type DebounceReturnType<R> = R;

export type DebouncedFunction<A, R> = (args: DebounceArgumentType<A>) => Promise<DebounceReturnType<R>>;

export type TeardownFunction = () => void;

export type DebounceReturnTuple<A, R> = [DebouncedFunction<A, R>, TeardownFunction];
