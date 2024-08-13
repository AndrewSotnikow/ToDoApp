import { CreateClassName, Transform } from './types';

export const settings = {
  transformClassName: ((cn) => cn) as Transform,
};

export const createClassName: CreateClassName = (
  classNames,
  options = {},
) => {
  return classNames
    .filter(Boolean)
    .map((cn) => {
      const normalized = String(cn).trim();
      return (options.transformClassName
        ? options.transformClassName(normalized)
        : settings.transformClassName(normalized)
      );
    })
    .join(' ');
};
