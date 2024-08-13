import { lstatSync, statSync } from 'fs';
import { AbsDirPath } from '#libraries/@interfaces';

export const isDirectoryExists = (path: AbsDirPath): boolean => {
  let result = false;

  try {
    result = statSync(path).isDirectory()
      || lstatSync(path).isDirectory();
  } catch (e) {
    result = false;
  }

  return result;
};
