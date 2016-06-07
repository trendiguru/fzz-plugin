const path = require('path');

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
                loader: 'css'
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
        'app/b_desktop.js': './app/desktop.js',
        'demo/b_demo.js': './demo/main.js',
        'demo/b_main.css': './demo/main.css'
    },
    output: {
        path: '.',
        filename: '[name]'
    },
    devtool: 'source-map'
};
