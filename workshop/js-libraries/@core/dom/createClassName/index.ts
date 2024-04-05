import { CreateClassName, Transform } from './types';

let transformClassName: Transform = (cn) => cn;

export const setTransform = (incomingTransform: Transform) => {
  transformClassName = incomingTransform;
};

export const createClassName: CreateClassName = (
  classNames,
  options = {},
) => {
  return classNames
    .filter(Boolean)
    .map((cn) => {
      const normalized = String(cn).trim();
      return (options.transform
          ? options.transform(normalized)
          : transformClassName(normalized)
      );
    })
    .join(' ');
};
