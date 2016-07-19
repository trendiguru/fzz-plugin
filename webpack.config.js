const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css', 'sass', 'postcss'])
            }
        ]
    },
    resolve: {
        root: [
            path.resolve('./')
        ]
    },
    entry: {
        'b_plugin.js': ['whatwg-fetch', 'babel-polyfill', './plugin/js/plugin.js'],
        'plugin/css/b_plugin.css': './plugin/css/plugin.scss',
        'app/b_app.js': ['whatwg-fetch', 'babel-polyfill', './app/main.js'],
        'app/css/b_app.css': './app/css/app.scss',
        'demo/b_demo.js': ['whatwg-fetch', 'babel-polyfill', './demo/main.js'],
        'demo/css/b_demo.css': './demo/css/demo.scss',
        'extensions/chrome/run_ext.js': ['babel-polyfill', 'extensions/chrome/es6_run_ext.js'],
        'plugin/js/b_test_tutorial.js': ['whatwg-fetch', 'babel-polyfill', './plugin/js/test_tutorial.js']
    },
    output: {
        path: '.',
        filename: '[name]'
    },
    plugins: [
        new ExtractTextPlugin('[name]')
    ],
    postcss: () => [],
    devtool: 'source-map'
};
