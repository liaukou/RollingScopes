const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV;

const config = {
    entry: './app/index.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.coffee']
    },
    devtool: NODE_ENV === 'production' ? '' : 'source-map',
};

if( NODE_ENV === 'production' ) {
    config.plugins = [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ];
}

module.exports = config;
