module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],

        plugins: [
            require('karma-jasmine'),
            require('karma-typescript'),
            require('karma-chrome-launcher')
        ],

        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },

        files: [
            // Polyfills
            'node_modules/core-js/client/shim.js',
            'node_modules/reflect-metadata/Reflect.js',
            // zone.js
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/long-stack-trace-zone.js',
            'node_modules/zone.js/dist/proxy.js',
            'node_modules/zone.js/dist/sync-test.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',
            // RxJs
            { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },

            { pattern: 'src/**/*.ts' },
        ],

        reporters: ['progress', 'karma-typescript'],

        browsers: ['Chrome'],
    });
}