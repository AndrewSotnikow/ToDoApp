export type StoreActionInterceptor<Type, State, Store> =
  (options: {
    action: (...args: any[]) => any,
    type: Type,
    args: Parameters<typeof options.action>,
    getStore: () => Store,
    setState: (state: State) => void,
  }) => typeof options.action;

export type DataStateStore<State> = {
  getState: () => State;
  setState: (state: State) => void;
  subscribe: (
    subscriber: (
      state: State,
      prevState: State,
      action: {
        type: string;
        args: Record<string, any>;
      },
    ) => void,
  ) => () => void;
  serialize: () => string;
  deserialize: (state: string) => State;
};
