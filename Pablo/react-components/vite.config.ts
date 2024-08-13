import { relative } from 'node:path';
import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { normalizePathSeparator } from '#libraries/@node/pathes/normalizePathSeparator';
import { multiPathAliasPlugin } from '#libraries/@node/vite/plugins/multiPathAliasPlugin';
import { transformContentPlugin } from '#libraries/@node/vite/plugins/transformContentPlugin';
// import { transformClassName } from '#libraries/dom/transformClassName';
// import { replaceSassVariablesValues } from '#libraries/dom/replaceSassVariablesValues';
import { replaceAliases } from '#libraries/dom/replaceAliases';
import { normalizePathes } from '#libraries/@node/typescript/normalizePathes';
// import { createNameSpace } from '#libraries/dom/createNameSpace';
import tsConfigFile from './tsconfig.json';

const aliases = Object.fromEntries(
  normalizePathes(
    tsConfigFile.compilerOptions.paths,
    __dirname,
  ),
);

export default defineConfig({
  plugins: [
    transformContentPlugin({
      enforce: 'pre',
      transform: (code, id) => {
        let newCode = code;
        if (id.endsWith('.sass')) {
          // newCode = replaceSassVariablesValues(newCode, (value) => {
          //   if (value === 'root---class---name') {
          //     return createNameSpace(id.split('/').at(-2) as string, {
          //       transformClassName,
          //     }).root();
          //   }
          //   return transformClassName(value);
          // });
          newCode = replaceAliases(newCode, Object.keys(aliases).reduce((res, alias) => {
            if (newCode.indexOf(alias) < 0) {
              return res;
            }
            res[alias] = normalizePathSeparator(relative(__dirname, aliases[alias][0]), '/');
            return res;
          }, {} as Record<string, string>));
          return { code: newCode, map: null };
        }
        return { code: newCode, map: null };
      },
    }),
    multiPathAliasPlugin(aliases),
    react(),
  ],
} as UserConfig);
