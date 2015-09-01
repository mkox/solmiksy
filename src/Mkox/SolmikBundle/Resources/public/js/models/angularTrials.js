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

            $http.post('/solmik/strings-in-categories', {}).success(function (data) {
                $scope.stringsInCategories = data.result;
//                $scope.stringsInCategories = [];


//            $scope.stringsInCategories = JSON.parse('{' + data + '}');
//                $scope.stringsInCategories = JSON.parse(data);
//                $scope.stringsInCategories = JSON.parse(data.result);

//                data = JSON.stringify(data);
//                $scope.stringsInCategories = JSON.parse(data);

//                $scope.stringsInCategories = data.result;
//                for (var x in $scope.stringsInCategories) {
//                    for ( var y in x) {
////                        $scope.stringsInCategories.x.y = JSON.parse($scope.stringsInCategories.x.y);
//                        $scope.stringsInCategories[x][y] = JSON.parse($scope.stringsInCategories[x][y]);
////                        $scope.stringsInCategories[x].y = JSON.parse($scope.stringsInCategories[x].y);
//                    }
//                }




//                for (var x in data.result) {
//                    $scope.stringsInCategories.push(JSON.parse(data.result[x]));
//                }

                console.log('$scope.stringsInCategories: ', $scope.stringsInCategories);
            });
            $scope.getObjectData = function (theObject) {
//                theObject = JSON.parse(theObject);
//                var dataString = ""
//                for (z in theObject) {
//                    dataString += z;
//                    dataString += '<br>';
//                    dataString += theObject[z];
//                    dataString += '<br>';
//                }
//                return dataString
            }
        }]);
});

