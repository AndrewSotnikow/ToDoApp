import path from 'path';
import webpack from 'webpack';
import { BuildPath } from './build/type/config'
import { getWebpackDefaultConfig } from './defaultConfig/webpackDefaultConfig'

const paths: BuildPath = {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    build:  path.join(__dirname, 'build'),
    html:  path.join(__dirname, 'public', 'index.html'),
    src:  path.join(__dirname, 'src')
}

const isDev = env.WEBPACK_MODE === 'development';

const config = (env, argv): webpack.Configuration => {

    const defaultConfig = getWebpackDefaultConfig({
        paths, env.PORT, isDev
    })

    return  {
        ...defaultConfig,
        mode: env.WEBPACK_MODE,
        entry: paths.entry,
        output: paths.build,
    }
}
export default config;


