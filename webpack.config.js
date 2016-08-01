const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ES_POLYFILLS = ['babel-polyfill', 'whatwg-fetch', './modules/polyfills'];

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
        new ExtractTextPlugin('[name]')
    ],
    postcss () {
        return [autoprefixer];
    },
    entry: {
        'extensions/chrome/run_ext.js': ['babel-polyfill', 'extensions/chrome/es6_run_ext.js'],
        'b_plugin.js':  ES_POLYFILLS.concat(['modules/elementsfrompoint.js', './plugin/js/plugin.js']),
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
