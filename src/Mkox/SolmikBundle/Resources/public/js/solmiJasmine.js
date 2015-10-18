require.config({
//    urlArgs: "cachebust=" + (new Date()).getTime(),
//  baseUrl: 'js/',
//  baseUrl: '/',
    paths: {
//        jquery: ['http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min', '../../../bower_components/jquery/dist/jquery.min'],
        jquery: ['../../../bower_components/jquery/dist/jquery.min'],
        underscore: '../../../bower_components/underscore/underscore-min',
//        angular: ['https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular.min', '../../../bower_components/angular/angular.min'],
        angular: ['../../../bower_components/angular/angular.min'],
        uiRouter: ['../../../bower_components/angular-ui-router/release/angular-ui-router.min'],
        audiosynth: 'libs/audiosynth/audiosynth',
//        tuner: 'models/tuner',
        cas: 'categoriesAndStrings',
        jasmine: ['../../../bower_components/jasmine/lib/jasmine-core/jasmine'],
        'jasmine-html': ['../../../bower_components/jasmine/lib/jasmine-core/jasmine-html'],
        'jasmine-boot': ['../../../bower_components/jasmine/lib/jasmine-core/boot']
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
        }
    }
//    deps: ['solmi']

});

require(["jasmine-boot", "infrastructure"], function () {
    require([
//        'solmiMain',
        "angular",
//        'jasmine',
//        'cas/cas-controller'], function (sM, ng) {
        'cas/cas-controller',
        'tests' // maybe in an other require() call;
    ], function (ng
//    , jasmine
            ) {
//console.log('jasmine in solmiJasmine.js: ', jasmine);
        ng.element(document).ready(function () {
            ng.bootstrap(document, ['categoriesAndStrings']);
            window.onload();
        });
    });
});