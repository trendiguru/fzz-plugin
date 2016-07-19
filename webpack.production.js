const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const config = require('./webpack.config.js');

webpack.optimize.UglifyJsPlugin();
webpack.optimize.DedupePlugin();

config.postcss = () => [
    autoprefixer
];

delete webpack.devtool;

module.exports = config;
