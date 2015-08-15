require.config({
    urlArgs: "cachebust=" + (new Date()).getTime(),
//  baseUrl: 'js/',
    paths: {
        jquery: [ 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min', 'libs/jquery/jquery-1.11.2.min' ],
        underscore: 'libs/underscore/underscore-min-1.7.0',
//        angular: [ 'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular.min', 'libs/angular/angular.min' ],
        angular: [ 'libs/angular/angular' ],
//        ngResource: [ 'libs/angular/angular-resource' ],
//        ngRoute: [ 'libs/angular/angular-route' ],
        
        audiosynth: 'libs/audiosynth/audiosynth'
//        tuner: 'models/tuner',
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
        }
//        ,
//        ngResource: {
//            deps: "angular"
//        },
//        ngRoute: {
//            deps: "angular"
////            exports: "ngRoute"
//        }
    }
//    deps: ['solmi']

});

require(["infrastructure"], function () {
    require(["solmi"], function (solmi) {
//        app.init();
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
