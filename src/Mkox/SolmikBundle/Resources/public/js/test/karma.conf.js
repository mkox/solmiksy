// Karma configuration
// Generated on Wed Oct 21 2015 19:47:04 GMT+0200 (CEST)

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../../..',
//        basePath: '..',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'requirejs'],
        // list of files / patterns to load in the browser

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
//            "mkoxsolmik/partials/**/*.html": ["ng-html2js"]
            "mkoxsolmik/partials/*.html": ["ng-html2js"] 
        },
        files: [
            'mkoxsolmik/js/test/test-solmi.js',
//            'mkoxsolmik/partials/**/*.html',
//            'mkoxsolmik/partials/*.html',
            {pattern: '**/*.js', included: false},
//            {pattern: '**/*.html', served: true, included: false}
//            {pattern: 'mkoxsolmik/partials/*.html', served: true, included: false}
//            {pattern: 'mkoxsolmik/partials/*.html', served: true}

//            'mkoxsolmik/partials/*.html'
            {pattern: 'mkoxsolmik/partials/*.html', included: false} // without "included: false": "ReferenceError: angular is not defined"
        ],
        // list of files to exclude
        exclude: [
        ],
        ngHtml2JsPreprocessor: {
            // If your build process changes the path to your templates,
            // use stripPrefix and prependPrefix to adjust it.
//            stripPrefix: "source/path/to/templates/.*/",
//            prependPrefix: "web/path/to/templates/",
//            prependPrefix: "bundles/",
//            stripPrefix: '.*/mkoxsolmik',

//            stripPrefix: 'mkoxsolmik',
//            prependPrefix: '/assets'
//            stripPrefix: 'mkoxsolmik/',
//            prependPrefix: 'assets/'
//            stripPrefix: './mkoxsolmik/',
//            prependPrefix: 'assets/'

//            ,
            // the name of the Angular module to create
//            moduleName: "solmik.templates"

            // Paths by default are relative to DISK root, 
            // so we need to make them relative to this folder
//  cacheIdFromPath : function(filepath) {
////    return filepath.substr(filepath.indexOf("appname")+8);
//console.log('filepath: ', filepath);
////    return filepath.strip('mkoxsolmik/partials/', '');
//    var filepath2 = filepath.substr(filepath.indexOf("mkoxsolmik/partials/")+20);
//    console.log('filepath2: ', filepath2);
//    return filepath2;
//  },
            // setting this option will create 
            // only a single module that contains templates
            // from all the files, so you can load them all 
            // with module('templates')
            
            prependPrefix: '/bundles/',
            moduleName: 'templates'





        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],
        // web server port
        port: 9876,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['Firefox', 'Chrome'],
        browsers: ['Firefox'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    })
}
