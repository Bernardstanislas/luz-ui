const webpack = require('webpack');
const config = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');
const WEBPACK_DEV_SERVER_PORT = 3000;

new WebpackDevServer(webpack(config), {
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    contentBase: './'
}).listen(WEBPACK_DEV_SERVER_PORT, 'localhost', function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Webpack dev server listening at http://localhost:%s', WEBPACK_DEV_SERVER_PORT);
});
