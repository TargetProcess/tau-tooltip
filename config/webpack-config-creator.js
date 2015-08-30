var webpack = require('webpack');
var path = require('path');
var coverage = [{
    test: /\.js$/,
    exclude: /test|node_modules/,
    loader: 'istanbul-instrumenter'
}];
var generateConf = function (postLoader) {
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
        devtool: 'inline-source-map',
        module: {
            loaders: [
                {test: /\.css$/, loader: 'css-loader'},
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ],
            postLoaders: postLoader
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
    coverage: generateConf(coverage),
    default: generateConf([])
};