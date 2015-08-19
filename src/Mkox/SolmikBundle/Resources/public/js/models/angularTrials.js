define(["jquery", "underscore", "angular", "ngSolmik"], function ($, _, ng, ngSolmik) {
//define(["jquery", "underscore", "angular", "ngResource", "ngRoute"], function ($, _, ng, ngRoute) {
//alert('angularTrials.js is reached');
    console.log('angularTrials.js  top');
//    var app = ng.module('solmik', []);

//    console.log('angularTrials.js  after ng.bootstrap');

//     ngSolmik.controller('test1Ctrl', function ($scope) {
//        $scope.firstName = "John";
//        $scope.lastName = "Doe";
//    });
//    
//    return ngSolmik;

    return ngSolmik.controller('test2Ctrl', ['$scope', '$http', function ($scope, $http) {
//    return ngSolmik.controller('test2Ctrl', function ($scope) {

//        $scope.name = 'MichaX';
//        $scope.foo = 'bar';

        $http.get('/solmik/hello2/you').success(function (data) {
            $scope.name = data.name;
        });

        $http.post('/solmik/post', {"foo": "bar"}).success(function (data) {
            $scope.foo = data.name.foo;
        });
    }]);
});

