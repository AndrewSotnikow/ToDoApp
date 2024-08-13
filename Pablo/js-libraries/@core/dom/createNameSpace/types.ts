export type CreateNameSpaceEndPipeline = {
  value: () => string;
  child: CreateNameSpacePipeline['child'];
};

export type CreateNameSpacePipeline = {
  root: () => string;
  child: (className: string, cacheID?: string, separator?: string) => CreateNameSpaceEndPipeline;
  value: () => string;
  solo: (className: string) => string;
};

export type CreateNameSpaceRootPipeline = CreateNameSpacePipeline & {
  get: (cacheID: string) => CreateNameSpacePipeline;
};

export type CreateNameSpace = (
  rootClassName: string,
  options?: {
    separators?: string[];
    transformClassName?: (cn: string) => string;
  },
) => CreateNameSpaceRootPipeline;
