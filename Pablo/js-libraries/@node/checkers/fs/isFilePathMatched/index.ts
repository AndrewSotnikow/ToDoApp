import { isFileExists } from '#libraries/@node/checkers/fs/isFileExists';
import { AbsFilePath, FilePath } from '#libraries/@interfaces';

export const isFilePathMatched = (
  path: AbsFilePath,
  patterns: (FilePath | RegExp)[] = ['*'],
) => {
  return isFileExists(path)
    && patterns.some((i) => {
      return i instanceof RegExp
        ? i.test(path)
        : path.indexOf(i) > -1;
    });
};
