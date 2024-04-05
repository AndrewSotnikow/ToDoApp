export const debounce = (fn: Function, ms = 0) => {
  if (ms < 1) {
    return fn;
  }

  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
