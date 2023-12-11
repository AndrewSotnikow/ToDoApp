import { toKebabCase } from '#libraries/@core/strings/toKebabCase';
import { CreateNameSpace, JoinClassName } from './types';

let boundedSeparators = ['--'];

export const setSeparators = (incomingSeparators: string[]) => {
  boundedSeparators = incomingSeparators;
};

let transformRootClassName = (cn: string) => toKebabCase(cn);

export const setRootClassNameTransformer = (transformer: typeof transformRootClassName) => {
  transformRootClassName = transformer;
};

export const createNameSpace: CreateNameSpace = (
  rootClassName,
  options = {},
) => {
  const rootCn = transformRootClassName(rootClassName);
  let result = rootCn;
  let firstCall = true;
  let partIndex = 0;

  const reset = () => {
    result = rootCn;
    firstCall = true;
    partIndex = 0;
  };

  const getSeparator = (index: number) => {
    const target = typeof options.separators !== 'undefined' && options.separators.length > 0
      ? options.separators
      : boundedSeparators;
    return target[index] || target[target.length - 1];
  };

  const proxy: ReturnType<typeof createNameSpace> = new Proxy(() => {}, {
    get(target: any, key) {
      if (firstCall && typeof target[key] === 'function') {
        firstCall = false;
        return target[key];
      }

      if (firstCall && typeof target[key] !== 'function') {
        firstCall = false;
        return proxy;
      }

      firstCall = false;

      if (key === 'value') {
        const saveResult = result;
        reset();
        return saveResult;
      }

      if (key === 'root') {
        reset();
        return rootCn;
      }

      return proxy;
    },

    apply(target, thisArg, args) {
      if (firstCall) {
        firstCall = false;
      }

      const [className, cacheID, separator] = args;

      if (className) {
        result += `${separator || getSeparator(partIndex)}${String(className)}`;
      }

      if (className && cacheID) {
        const saveResult = result;
        proxy[cacheID] = (...args: Parameters<JoinClassName>) => {
          partIndex = 0;
          result = saveResult;
          return proxy(...args);
        };
      }
      partIndex++;
      return proxy;
    },
  });

  return proxy;
};
