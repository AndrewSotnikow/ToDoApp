export type Transform = (className: string) => string;

export type CreateClassName = (
  classNames: string[],
  options?: {
    transformClassName?: Transform;
  },
) => string;
