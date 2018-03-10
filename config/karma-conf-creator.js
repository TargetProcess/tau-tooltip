module.exports = function (mode) {
    var webpackConfig = require('./webpack-config-creator');
    var karmaConfigMap = {
        dev: {
            reporters: ['mocha', 'coverage'],
            browsers: ['Chrome'],
            coverageReporter: {
                type: 'html',
                dir: 'coverage/'
            }
        },
        ci: {
            reporters: ['coverage', 'mocha', 'coveralls'],
            browsers: ['Firefox'],
            coverageReporter: {
                type: 'lcovonly',
                dir: 'coverage/'
            }
        }
    };
    var karmaConfig = karmaConfigMap[mode];
    return function (config) {
        config.set({

            // base path that will be used to resolve all patterns (eg. files, exclude)
            basePath: '..',


            // frameworks to use
            // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
            frameworks: ['mocha'],


            // list of files / patterns to load in the browser
            files: [
                {pattern: 'tooltip.css', included: true},
                'test/tooltip.test.js'
            ],


            // list of files to exclude
            exclude: [],


            // preprocess matching files before serving them to the browser
            // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
            preprocessors: {'test/tooltip.test.js': ['webpack', 'sourcemap']},


            // test results reporter to use
            // possible values: 'dots', 'progress'
            // available reporters: https://npmjs.org/browse/keyword/karma-reporter
            reporters: karmaConfig.reporters,
            coverageReporter: karmaConfig.coverageReporter,

            webpack: webpackConfig.coverage,
            // web server port
            port: 9876,


            // enable / disable colors in the output (reporters and logs)
            colors: true,


            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_INFO,


            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: false,


            // start these browsers
            // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
            browsers: karmaConfig.browsers,


            // Continuous Integration mode
            // if true, Karma captures browsers, runs the tests and exits
            singleRun: true
        });
    }
};
