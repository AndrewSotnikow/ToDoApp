import { AbsFilePath, AbsDirPath } from "#libraries/@interfaces";

type Alias = string;
export type MappedAliases = Record<Alias, (AbsFilePath | AbsDirPath)[]>;
