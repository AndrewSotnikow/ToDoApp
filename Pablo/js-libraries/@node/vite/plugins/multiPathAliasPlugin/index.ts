import { Plugin } from 'vite';
import { sep } from 'node:path';
import { appendImportPath } from '#libraries/@node/pathes/appendImportPath';
import { isFileExists } from '#libraries/@node/checkers/fs/isFileExists';
import { normalizePathSeparator } from '#libraries/@node/pathes/normalizePathSeparator';
import { MappedAliases } from './types';

export const multiPathAliasPlugin = (mappedAliases: MappedAliases): Plugin => {
  return {
    name: 'multi-path-alias-plugin',
    resolveId(source) {
      const aliases = Object.keys(mappedAliases);

      const alias = aliases.find((a) => source.startsWith(a));

      if (!alias) {
        return null;
      }
      let result = '';

      (mappedAliases[alias] || []).some((path) => {
        const finalPath = appendImportPath(
          normalizePathSeparator(
            source.replace(alias, path),
            sep,
          ),
        );
        if (isFileExists(finalPath)) {
          result = finalPath;
          return true;
        }
        return false;
      });

      return result || null;
    },
  };
};
