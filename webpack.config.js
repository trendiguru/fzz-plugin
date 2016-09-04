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
        'b_plugin.js':  ES_POLYFILLS.concat('./plugin/js/plugin.js'),
        'b_plugin.css': './plugin/css/plugin.scss',
        'b_app.js': ES_POLYFILLS.concat('./app/main.js'),
        'b_app.css': './app/css/app.scss',
        'b_demo.js': ES_POLYFILLS.concat('./demo/main.js'),
        'b_demo.css': './demo/css/demo.scss',
        // CHROME EXTENSION ALIAS
	    'extensions/chrome_dev/assets/b_popup.js':ES_POLYFILLS.concat('./extensions/chrome_dev/assets/js/popup.js'),
        'extensions/chrome_dev/assets/b_background.js':ES_POLYFILLS.concat('./extensions/chrome_dev/assets/js/background.js'),
        'extensions/chrome_dev/b_plugin.js': ES_POLYFILLS.concat('./plugin/js/plugin.js'),
        'extensions/chrome_dev/b_plugin.css': './plugin/css/plugin.scss',
        'extensions/chrome_dev/b_app.js': ES_POLYFILLS.concat([
            'expose?React!react',
            'expose?ReactDOM!react-dom',
            './app/main.js'
        ]),
        'extensions/chrome_dev/b_app.css': './app/css/app.scss',
    },
    output: {
        path: '.',
        filename: '[name]'
    },
    devtool: 'source-map'
};
