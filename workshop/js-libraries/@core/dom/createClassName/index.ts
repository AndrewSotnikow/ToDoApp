export const createClassName = (classes: string[]): string => {
  return classes.filter(Boolean).join('--');
};
