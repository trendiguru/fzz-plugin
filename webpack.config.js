const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ES_POLYFILLS = ['core-js', 'regenerator-runtime/runtime', 'whatwg-fetch', 'modules/polyfills'];

module.exports = {
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract([
                    'css?sourceMap',
                    'postcss',
                    'sass?sourceMap'
                ])
            }
        ]
    },
    resolve: {
        root: [
            path.resolve('./')
        ]
    },
    plugins: [
        // This needs to be in index 0 to remain accessible
        // in webpack.production & webpack.test
        new webpack.DefinePlugin({
            'ENVIRONMENT': '"DEV"'
        }),
        //-------------------------------------------------
        new ExtractTextPlugin('[name]')
    ],
    postcss () {
        return [autoprefixer];
    },
    entry: {
        'extensions/chrome/run_ext.js': ['regenerator-runtime/runtime', 'extensions/chrome/es6_run_ext.js'],
        'b_plugin.js':  ES_POLYFILLS.concat(['./plugin/js/plugin.js']),
        'plugin/css/b_plugin.css': './plugin/css/plugin.scss',
        'app/b_app.js': ES_POLYFILLS.concat('./app/main.js'),
        'app/css/b_app.css': './app/css/app.scss',
        'demo/b_demo.js': ES_POLYFILLS.concat('./demo/main.js'),
        'demo/css/b_demo.css': './demo/css/demo.scss'
    },
    output: {
        path: '.',
        filename: '[name]'
    },
    devtool: 'source-map'
};
