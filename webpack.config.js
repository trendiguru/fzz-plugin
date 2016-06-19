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
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css')
            }
        ]
    },
    resolve: {
        root: [
            path.resolve('./')
        ]
    },
    entry: {
        'b_plugin.js': './plugin/js/plugin.js',
        'plugin/css/b_plugin.css': './plugin/css/plugin.css',
        'app/b_app.js': './app/main.js',
        'app/css/b_app.css': './app/css/app.css',
        'demo/b_demo.js': './demo/main.js',
        'demo/b_demo.css': './demo/main.css'
    },
    output: {
        path: '.',
        filename: '[name]'
    },
    plugins: [
        new ExtractTextPlugin('[name]')
    ],
    devtool: 'source-map'
};
