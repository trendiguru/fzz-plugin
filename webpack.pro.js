const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const config = require('./webpack.config.js');

webpack.optimize.UglifyJsPlugin();
webpack.optimize.DedupePlugin();

config.postcss = () => [
    precss,
    autoprefixer
];

delete webpack.devtool;

module.exports = config;
