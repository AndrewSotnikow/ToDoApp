import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from "html-webpack-plugin";
import { BuildPaths } from './type/config'

export function buildPlugins({paths}: BuildPaths): webpack.WebpackPluginInstance {
    return [
        new HTMLWebpackPlugin({
            template: paths.build
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthas: 8].css',
            chunkFilename: 'css/[name].[contenthas: 8].css'
        })
    ]
}