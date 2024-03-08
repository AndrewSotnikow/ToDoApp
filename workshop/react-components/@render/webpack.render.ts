import { join } from 'path';
import { CallableOption } from 'webpack-cli/lib/types';
import { Configuration } from 'webpack/types';
import { getDefaultConfig } from '#packages/webpack';
import { Mode } from '#libraries/@interfaces';
import { webpackAliases } from '../setup';

console.log(webpackAliases);

const getConfig: CallableOption = (env, argv) => {
  const mode = argv.mode === Mode.production
    ? Mode.production
    : Mode.development;

  const defaultConfig = getDefaultConfig(env) || {};

  return {
    ...defaultConfig,
    mode,
    entry: {
      scripts: join(__dirname, 'index.tsx'),
    },
    output: {
      path: env?.WEBPACK_SERVE ? '/' : __dirname,
    },
    resolve: {
      ...(defaultConfig.resolve || {}),
      alias: webpackAliases,
    },
  } as Configuration;
};

export default getConfig;
