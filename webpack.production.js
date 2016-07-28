const webpack = require('webpack');
const config = require('./webpack.config.js');

webpack.optimize.UglifyJsPlugin();
webpack.optimize.DedupePlugin();

config.plugins[0] = new webpack.DefinePlugin({
    'ENVIRONMENT': '"PRODUCTION"'
});

delete config.devtool;

module.exports = config;
