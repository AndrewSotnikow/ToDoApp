const g = global as any;

export const mockMutationObserver = (mockFunction = (type: string) => type) => {
  g.MutationObserver = function MutationObserver() {
    this.observe = () => mockFunction('observe');
    this.disconnect = () => mockFunction('disconnect');
    this.trigger = () => mockFunction('trigger');
  };
};

export const mockResizeObserver = (mockFunction = (type: string) => type) => {
  g.ResizeObserver = function ResizeObserver() {
    this.observe = () => mockFunction('observe');
    this.unobserve = () => mockFunction('unobserve');
    this.disconnect = () => mockFunction('disconnect');
  };
};

export const mockLocalStorage = (mockFunction = (
  store: Record<string, string>,
  type: string,
) => type) => {
  g.localStorage = new (class {
    store: Record<string, string> = {};

    constructor() {
      this.store = {};
    }

    clear() {
      this.store = {};
      mockFunction(this.store, 'clear');
    }

    getItem(key: string) {
      mockFunction(this.store, 'getItem');
      return this.store[key] || null;
    }

    setItem(key: string, value: string) {
      this.store[key] = String(value);
      mockFunction(this.store, 'setItem');
    }

    removeItem(key: string) {
      delete this.store[key];
      mockFunction(this.store, 'removeItem');
    }
  })();
};
