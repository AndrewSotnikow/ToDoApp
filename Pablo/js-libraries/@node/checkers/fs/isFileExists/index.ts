import { statSync, lstatSync } from 'fs';
import { AbsDirPath } from '#libraries/@interfaces';

export const isFileExists = (
  path: AbsDirPath,
): boolean => {
  let result = false;

  try {
    result = statSync(path).isFile()
      || lstatSync(path).isFile();
  } catch (e) {
    result = false;
  }

  return result;
};
