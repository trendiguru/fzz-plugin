const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENVIRONMENT = process.env.ENVIRONMENT || 'DEV';
const ES_POLYFILLS = ['core-js', 'regenerator-runtime/runtime', 'whatwg-fetch', 'modules/polyfills', 'wicked-good-xpath', 'custom-event-polyfill'];

let config = {
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules\/(?!delux)/
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
        new webpack.DefinePlugin({
            ENVIRONMENT: `"${ENVIRONMENT}"`
        }),
        new ExtractTextPlugin('[name]'),
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
        // Extension
        'dev-extension/b_popup.js':ES_POLYFILLS.concat('./dev-extension/js/popup.js'),
        'dev-extension/b_background.js':ES_POLYFILLS.concat('./dev-extension/js/background.js'),
        // Alias
        'b_app.local.js': ES_POLYFILLS.concat([
            'expose?React!react',
            'expose?ReactDOM!react-dom',
            './app/main.js'
        ]),
    },
    output: {
        path: '.',
        filename: '[name]'
    },
    devtool: 'source-map'
};

if (ENVIRONMENT === 'PRODUCTION') {
    webpack.optimize.UglifyJsPlugin();
    webpack.optimize.DedupePlugin();
    delete config.devtool;
}

module.exports = config;
