const webpack = require('webpack');
const config = require('./webpack.config.js');

webpack.optimize.UglifyJsPlugin();
webpack.optimize.DedupePlugin();

delete config.devtool;

module.exports = config;
