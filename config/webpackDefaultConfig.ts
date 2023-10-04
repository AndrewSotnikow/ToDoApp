import webpack from 'webpack';
import { buildLoaders } from './build/buildLoaders'
import { buildResolve } from './build/buildResolve'
import { buildPlugins } from './build/buildPugins'
import { buildDevServer } from './build/buildDevserver'
import { BuildOptions } from './build/type/config'

export const getWebpackDefaultConfig = (options: BuildOptions): webpack.Configuration => {
    const {paths, mode, isDev} = options;
    return {
        plugins: buildPlugins({paths}),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolve(),
        devtool: isDev ? 'inline-source-map': undefined,
        devServer: isDev ?  buildDevServer(port) : undefined
    }
}
