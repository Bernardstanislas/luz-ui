const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config = {
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src'
    ],
    output: {
        path: __dirname,
        filename: 'luz-ui.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: 'true'
        }),
        new HtmlWebpackPlugin({
            title: 'Luz UI',
            inject: 'body',
            templateContent: '<body><div class="luz"/></body>'
        })
    ],
    module: {
        loaders: [
            {
                test: /.js$/,
                loaders: ['react-hot', 'babel'],
                include: [
                    path.resolve(__dirname, './src')
                ]
            },
            {
                test: /\.json$/,
                loaders: ['json']
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    }
}

module.exports = config;
