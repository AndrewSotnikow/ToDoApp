import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { getDefaultConfig } from '#packages/jest';
import { syncProjects } from '#libraries/@node/typescript/syncProjects';
import { compilerOptions } from 'tsconfig.json';

compilerOptions.paths = syncProjects({
  absDirectoryRoot: __dirname,
  mergeAliases: ['#libraries'],
});

[
  '#libraries/*',
  '#packages/*',
].forEach((alias) => {
  const pathes = compilerOptions.paths as any;
  const paths = pathes[alias];
  delete pathes[alias];
  pathes[alias] = paths;
});

const defaultConfig = getDefaultConfig();

const config: Config = {
  ...defaultConfig,
  rootDir: '.',
  moduleNameMapper: {
    ...(defaultConfig.moduleNameMapper || {}),
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
  ],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      { tsconfig: compilerOptions },
    ],
  },
};

export default config;
