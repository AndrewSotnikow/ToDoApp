import { sep } from 'node:path';
import { isFileExists } from '#libraries/@node/checkers/fs/isFileExists';

export const appendImportPath = (
  originalPath: string,
  possibleExt = [
    '.tsx',
    '.ts',
    '.jsx',
    '.js',
  ],
) => {
  if (isFileExists(originalPath)) {
    return originalPath;
  }

  const suffix = [
    ...possibleExt,
    ...possibleExt.map((pe) => `${sep}index${pe}`),
  ].find((e) => isFileExists(`${originalPath}${e}`));

  return suffix
    ? `${originalPath}${suffix}`
    : originalPath;
};
