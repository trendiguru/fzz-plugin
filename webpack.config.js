const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {env: {ENVIRONMENT = 'DEV'}} = process;
const ES_POLYFILLS = [
    'core-js/es6',
    'core-js/es7',
    'regenerator-runtime/runtime',
    'whatwg-fetch',
    'modules/polyfills',
    'wicked-good-xpath',
    'custom-event-polyfill',
    'classlist-polyfill'
];

let config = {
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules(?!\/delux)/,
                loader: 'babel'
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract([
                    'css?sourceMap',
                    'postcss',
                    'sass?sourceMap'
                ]),
                exclude: /node_modules\/(?!delux)/
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
    config.plugins = config.plugins.concat([
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin()
    ]);
    delete config.devtool;
}

module.exports = config;
