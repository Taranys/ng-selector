module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],

        plugins: [
            require('karma-jasmine'),
            require('karma-typescript'),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
        ],

        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },

        karmaTypescriptConfig: {
            compilerOptions: {
                "lib": [ "es6", "dom" ],
                "noStrictGenericChecks": true // workaround needed since typescript 2.4, will be fixed with rxjs 6, see https://stackoverflow.com/questions/44810195/how-do-i-get-around-this-error-in-rxjs-5-x-in-typescript-2-4                
            }
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

        browsers: [
            // 'Chrome',
            'PhantomJS',
        ],
    });
}