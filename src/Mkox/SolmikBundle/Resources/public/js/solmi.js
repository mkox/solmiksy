require.config({
//    urlArgs: "cachebust=" + (new Date()).getTime(),
//  baseUrl: 'js/',
//  baseUrl: '/',
    paths: {
//        jquery: ['http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min', '../../../bower_components/jquery/dist/jquery.min'],
        jquery: ['../../../bower_components/jquery/dist/jquery.min'],
        underscore: '../../../bower_components/underscore/underscore-min',
//        angular: ['https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular.min', '../../../bower_components/angular/angular.min'],
        angular: [ '../../../bower_components/angular/angular.min' ],
        uiRouter: ['../../../bower_components/angular-ui-router/release/angular-ui-router.min'],

        audiosynth: 'libs/audiosynth/audiosynth',
//        tuner: 'models/tuner',
        cas: 'categoriesAndStrings'
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
        }
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
    }
//    deps: ['solmi']

});

require(["infrastructure"], function () {
    require(['solmiBasics',
        'solmiMain',
        "angular",
        'cas/cas-controller'], function (sB, sM, ng) {
//        app.init();
        ng.element(document).ready(function () {
            ng.bootstrap(document, ['categoriesAndStrings']);
        });
    });
});


//require([
//
//  // Load our app module and pass it to our definition function
////  'solmiBasics'
//  'test10'
//], function(sb){
////    console.log('solmiBasics', sb);
//  // The "app" dependency is passed in as "App"
////  App.initialize();
//});
