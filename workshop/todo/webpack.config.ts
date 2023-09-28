import { join } from 'path';
import { getDefaultConfig } from '#packages/webpack';
import {
  Configuration,
} from 'webpack';
import { CallableOption } from 'webpack-cli/lib/types';
import { Mode } from '#libraries/@interfaces';
import { webpackAliases } from './setup';

const getConfig: CallableOption = (env, argv) => {
  const mode = argv.mode === Mode.production
    ? Mode.production
    : Mode.development;

  const defaultConfig = getDefaultConfig(env, mode) || {};
  const rules = defaultConfig?.module?.rules || [];

  return {
    ...defaultConfig,
    mode,
    entry: {
      todo: join(__dirname, 'frontend/index.tsx'),
    },
    output: {
      path: env?.WEBPACK_SERVE ? '/' : join(__dirname, 'frontend/.public/dist'),
      clean: true,
    },
    resolveLoader: {
      modules: [
        'node_modules',
        ...webpackAliases['#libraries'].map((v) => join(v, '@node/webpack/loaders')),
      ],
    },
    resolve: {
      ...(defaultConfig.resolve || {}),
      alias: webpackAliases,
    },
    devServer: {
      ...(defaultConfig.devServer || {}),
      static: {
        directory: join(__dirname, 'frontend/.public'),
      },
      setupMiddlewares: (middlewares, devServer) => {
        devServer.app!.use('/dist/todo.css', (req, res) => {
          res.end();
        });
        return middlewares;
      },
      historyApiFallback: {
        rewrites: [
          {
            from: /dist\/(.*)/,
            to: (context) => {
              return context.parsedUrl.href.replace('dist/', '');
            },
          },
        ],
      },
      port: 9000,
      client: { overlay: false },
    },
    devtool: false,
    optimization: {
      minimizer: [
        ...(defaultConfig.optimization?.minimizer || []),
      ],
    },
    module: {
      ...(defaultConfig.module || {}),
      rules,
    },
  } as Configuration;
};

export default getConfig;
