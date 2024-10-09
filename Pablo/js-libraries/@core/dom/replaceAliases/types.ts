import {
  AbsDirPath,
  AbsFilePath,
  DirPath,
  FilePath,
} from '#libraries/@interfaces';

type AliasName = string;
type AliasPath = AbsDirPath | DirPath | FilePath | AbsFilePath;

export type Mappings = Record<AliasName, AliasPath>;
