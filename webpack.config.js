const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const configBuilder = function(DEV) {
    return ({
        entry: DEV ? [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './src'
        ] : ['./src'],
        output: {
            path: __dirname,
            filename: 'luz-ui.js',
            publicPath: '/'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                __DEV__: DEV
            }),
            new ExtractTextPlugin('styles.css')
        ],
        resolve: {
            extensions: ['', '.webpack.js', '.web.js', '.js', '.scss']
        },
        module: {
            loaders: [
                {
                    test: /.js$/,
                    loaders: DEV ? ['react-hot', 'babel'] : ['babel'],
                    include: [
                        path.resolve(__dirname, './src')
                    ]
                },
                {
                    test: /\.json$/,
                    loaders: ['json']
                },
                {
                    test: /(\.scss|\.css)$/,
                    loader: ExtractTextPlugin.extract('style', 'css!sass')
                }
            ]
        }
    });
};

const config = configBuilder(false);
config.builder = configBuilder;

module.exports = config;
