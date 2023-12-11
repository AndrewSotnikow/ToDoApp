export type JoinClassName = (
  className?: string,
  cacheID?: string,
  separator?: string,
) => JoinClassName & {
  root: string;
  value: string;
};

export type CreateNameSpace = (
  rootClassName: string,
  options?: {
    separators?: string[];
  },
) => JoinClassName & Record<string, JoinClassName>;
