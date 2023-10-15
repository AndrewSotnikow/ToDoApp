import { CallableOption, WebpackConfiguration } from 'webpack-cli/lib/types';
// import { Compiler as WebpackCompiler } from 'webpack';
// import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';

// type LoaderType = 'typescript-file' | 'style-file';

export const getDefaultConfig = (
  env: Parameters<CallableOption>[0],
  // mode: string,
): WebpackConfiguration => {
  return {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devServer: {
      hot: true,
      compress: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                getCustomTransformers: () => ({
                  before: [
                    env?.WEBPACK_SERVE && ReactRefreshTypeScript(),
                  ].filter(Boolean),
                }),
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.(s[ac]ss|css)$/i,
          use: [
            env?.WEBPACK_SERVE ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      env?.WEBPACK_SERVE && new ReactRefreshPlugin(),
      !env?.WEBPACK_SERVE && new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ].filter(Boolean),
  } as WebpackConfiguration;
};
