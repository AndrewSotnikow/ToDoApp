export type TsconfigFile = {
  compilerOptions?: {
    paths?: {
      [alias: string]: string | string[];
    };
  };
};

export type PackageJSONFile = {
  name: string;
  version: string;
  description: string;
};
