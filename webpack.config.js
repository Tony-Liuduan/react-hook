const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
    output: {
        path: path.resolve('dist'),
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve('src'),
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve(__dirname, './tsconfig.json')
                }
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new WebpackBuildNotifierPlugin({
            title: 'Webpack Build Over',
            suppressSuccess: true
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: { // 默认热更新
        port: 3000,
        historyApiFallback: true,
        open: true,
        hot: true,
    }
};
