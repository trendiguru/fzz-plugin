const webpack = require('webpack');
const config = require('./webpack.config.js');

config.plugins[0] = new webpack.DefinePlugin({
    'ENVIRONMENT': '"TEST"'
});

module.exports = config;
