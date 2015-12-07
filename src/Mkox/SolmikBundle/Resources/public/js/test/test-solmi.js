//var TEST_REGEXP = /(spec|test)\.js$/i;
//var allTestFiles = [];
//
//// Get a list of all the test files to include
//Object.keys(window.__karma__.files).forEach(function(file) {
//  if (TEST_REGEXP.test(file)) {
//    // Normalize paths to RequireJS module names.
//    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
//    // then do not normalize the paths
//    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
//    allTestFiles.push(normalizedTestModule);
//  }
//});

var allTestFiles = [];
var TEST_REGEXP = /(_spec|_test)\.js$/i;
for (var file in window.__karma__.files) {
  if (TEST_REGEXP.test(file)) allTestFiles.push(file);
}
console.log('allTestFiles: ', allTestFiles);

require.config({
//    urlArgs: "cachebust=" + (new Date()).getTime(),
  baseUrl: '/base/mkoxsolmik/js',
//  baseUrl: '/base',
    paths: {
//        jquery: ['http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min', '../../../bower_components/jquery/dist/jquery.min'],
        jquery: ['/base/bower_components/jquery/dist/jquery.min'],
        underscore: '/base/bower_components/underscore/underscore-min',
//        angular: ['https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular.min', '../../../bower_components/angular/angular.min'],
//        angular: ['/base/bower_components/angular/angular.min'],
        angular: ['/base/bower_components/angular/angular'],
        uiRouter: ['/base/bower_components/angular-ui-router/release/angular-ui-router.min'],
        audiosynth: '/base/mkoxsolmik/js/libs/audiosynth/audiosynth',
//        tuner: 'models/tuner',
        cas: '/base/mkoxsolmik/js/categoriesAndStrings',
//        cas: 'categoriesAndStrings',
//        categoriesAndStrings: 'categoriesAndStrings/categoriesAndStrings',
        jasmine: ['/base/bower_components/jasmine/lib/jasmine-core/jasmine'],
        'jasmine-html': ['/base/bower_components/jasmine/lib/jasmine-core/jasmine-html'],
        'jasmine-boot': ['/base/bower_components/jasmine/lib/jasmine-core/boot'],
        'angular-mocks': ['/base/bower_components/angular-mocks/angular-mocks'],
//        'partials': 'partials'
        'partials': '/base/mkoxsolmik/partials'
//        'mkoxsolmik': '/base/mkoxsolmik'
    },
    shim: {
        audiosynth: {
        },
//        tuner: {},
        underscore: {
            exports: "_"
        },
//        backbone: {
//            deps: ["jquery", "underscore"],
//            exports: "Backbone"
//        },
        angular: {
            exports: "angular"
        },
//        angularUiRouter: {
//            exports: "uiRouter",
//            deps: ["angular"]
//        }
        uiRouter: {
            deps: ["angular"]
        },
//        angularUiRouter: {
//            
//        }
//        ,
//        ngResource: {
//            deps: ["angular"]
//        },
//        ,
//        ngRoute: {
//            deps: ["angular"]
//        }
        'jasmine-html': {
            deps: ['jasmine']
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html']
        },
        'angular-mocks': {
            deps: ['angular']
        }
        ,
        'partials/categoryDelete.html': {deps: ['angular']},
        'partials/categoryEdit.html': {deps: ['angular']},
        
        'partials/categoryEdit2.html': {deps: ['angular']},
//        'mkoxsolmik/partials/categoryEdit2.html': {deps: ['angular']},

        'partials/categoryNew.html': {deps: ['angular']},
        'partials/stringDelete.html': {deps: ['angular']},
        'partials/stringEdit.html': {deps: ['angular']},
        'partials/stringNew.html': {deps: ['angular']}
    },
//    deps: ['solmi']

    // dynamically load all test files
    deps: allTestFiles,
//    deps: ['angular'],
    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start

});

//require(allTestFiles, function () {
//});

//require(["angular"], function () {
//    require(allTestFiles);
//});

//require(["jasmine-boot", "infrastructure"], function () {
//    require([
////        'solmiMain',
//        "angular",
//        'angular-mocks',
////        'jasmine',
////        'cas/cas-controller'], function (sM, ng) {
//        'cas/cas-controller',
//        'tests' // maybe in an other require() call;
//    ], function (
//            ng
////    , jasmine
//            ) {
////console.log('jasmine in solmiJasmine.js: ', jasmine);
//        ng.element(document).ready(function () {
//            ng.bootstrap(document, ['categoriesAndStrings']);
//            window.onload();
//        });
//    });
//});