export type Transform = (className: string) => string;

export type CreateClassName = (
  classNames: string[],
  options?: {
    transform?: Transform;
  },
) => string;
