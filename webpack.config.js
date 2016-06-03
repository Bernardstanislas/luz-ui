const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = JSON.parse(process.env.DEV || 'true');

const configBuilder = function(DEV) {
    return ({
        entry: DEV ? [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './src'
        ] : ['./src'],
        output: {
            path: path.resolve(process.cwd(), './dist'),
            filename: 'luz-ui.js',
            publicPath: './'
        },
        plugins: DEV ? [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                __DEV__: DEV
            }),
            new HtmlWebpackPlugin({
                inject: 'html',
                templateContent: '<html><head><title>Luz</title></head><body><div class="luz"/></body></html>'
            })
        ] : [
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.DefinePlugin({
                __DEV__: DEV
            }),
            new HtmlWebpackPlugin({
                inject: 'html',
                templateContent: '<html><head><title>Luz</title></head><body><div class="luz"/></body></html>'
            }),
            new webpack.optimize.DedupePlugin()
        ],
        resolve: {
            extensions: ["", ".webpack.js", ".web.js", ".js", ".scss"]
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
                    loaders: ['style', 'css', 'sass']
                },
                {
                    test: /\.jpg$/,
                    loader: 'url-loader',
                    query: { mimetype: 'image/jpg' }
                },
                {
                    test: /\.svg/,
                    loader: 'url-loader',
                    query: { mimetype: 'image/svg' }
                },
                {
                    test: /\.(eot|ttf|woff)/,
                    loader: 'file-loader'
                }
            ]
        }
    });
};

const config = configBuilder(dev);
config.builder = configBuilder;

module.exports = config;
