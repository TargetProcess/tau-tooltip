var webpack = require('webpack');
var path = require('path');
var coverage = [{
    test: /\.js$/,
    exclude: /test|node_modules/,
    loader: 'istanbul-instrumenter'
}];
var generateConf = function (config) {
    return {
        resolve: {
            root: [
                path.resolve('.')
            ],
            modulesDirectories: [
                'node_modules'
            ],
            extensions: ['', '.js', '.json']
        },
        entry: config.entry || './',
        output: config.output,
        devtool: config.devtool || '',
        module: {
            loaders: [
                {test: /\.css$/, loader: 'css-loader'},
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ],
            postLoaders: config.postLoader || []
        },
        debug: false,
        stats: {
            colors: true,
            reasons: true
        },
        progress: true
    };
};

module.exports = {
    coverage: generateConf({postLoader: coverage, devtool: 'inline-source-map'}),
    default: generateConf({}),
    prod: generateConf({
        output: {
            libraryTarget: 'umd',
            library: 'Tooltip',
            filename: 'tooltip.js',
            entry: './src/tooltip',
        }
    })
};