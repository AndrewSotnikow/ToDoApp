import webpack from 'webpack';
import { BuildOptions } from './type/config'

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule{

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            options.isDev ? 'style-loader' : MiniCssExtractPlgin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => resPath.includes('.module.'),
                        localIdentName: isDev ? '[path][name]___[local]' : '[hash:base64:8]'
                    },

                }
            },
            'sass-loader',
        ]
    }

    const typescriptLoader =  {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    return [
        typescriptLoader,
        cssLoader,
    ]
}