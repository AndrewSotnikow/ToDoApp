import { syncProjects } from '#libraries/@node/typescript/syncProjects';
import { normalizePathes } from '#libraries/@node/typescript/normalizePathes';
import tsFile from 'tsconfig.json';

tsFile.compilerOptions.paths = syncProjects({
  absDirectoryRoot: __dirname,
  mergeAliases: ['#libraries'],
});

tsFile.compilerOptions.paths = syncProjects({
  absDirectoryRoot: __dirname,
  mergeAliases: ['#components'],
});

export const tsconfigFile = tsFile;

const aliases = Object.fromEntries(
  normalizePathes(
    tsFile.compilerOptions.paths,
    __dirname,
  ),
);

export const webpackAliases = aliases;
