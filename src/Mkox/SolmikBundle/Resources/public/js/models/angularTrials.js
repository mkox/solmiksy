define(["jquery", "underscore", "angular", "ngSolmik", "solmiBasics"], function ($, _, ng, ngSolmik, sb) {
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

    ngSolmik.filter('range', function () {
        return function (input, min, max) {
            min = parseInt(min); //Make string input int
            max = parseInt(max);
            for (var i = min; i < max; i++)
                input.push(i);
            return input;
        };
    });

    ngSolmik.directive('getSoundKey', function () {

//        var flughaefen = [
//            {id: "FRA", name: "Frankfurt"},
//            {id: "HAM", name: "Hamburg"},
//            {id: "GRA", name: "Graz"}
//        ];

        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {

//                ngModel.$parsers.push(function (viewValue) {
//                    var fh = _.find(flughaefen, function (fh) {
//                        return fh.name == viewValue;
//                    });
//
//                    if (fh) {
//                        ngModel.$setValidity('flughafen', true);
//                        return fh.id;
//
//                    }
//                    else {
//                        ngModel.$setValidity('flughafen', false);
//                        return undefined;
//                    }
//                });

                ngModel.$formatters.push(function (value) {
                    console.log('ngModel.$formatters value', value);
                    var selectedKey = {};
                    selectedKey.name = value;
                    console.log('ngModel.$formatters selectedKey', selectedKey);
                    return selectedKey;

//                    var fh = _.find(flughaefen, function (fh) {
//                        return fh.id == value;
//                    });
//
//                    if (fh) {
//                        return fh.name;
//
//                    }
//                    else {
//                        return value;
//                    }
                });

            }
        };
    });

    return ngSolmik.controller('test2Ctrl', ['$scope', '$http', function ($scope, $http) {
//    return ngSolmik.controller('test2Ctrl', function ($scope) {

            $http.get('/solmik/hello2/you').success(function (data) {
                $scope.name = data.name;
            });

            $http.post('/solmik/post', {"foo": "bar"}).success(function (data) {
                $scope.foo = data.name.foo;
            });

//            $scope.soundKeys = sb.soundKeys2['major'] + sb.soundKeys2['minor'];
//            $scope.soundKeys = jQuery.extend({}, sb.soundKeys2['major'], sb.soundKeys2['minor']);
//            $scope.soundKeys = jQuery.extend({}, sb.soundKeys2['major']);
            $scope.soundKeysArray = sb.soundKeysArray;
            console.log('ngSolmik.controller $scope.soundKeysArray', $scope.soundKeysArray);
//            $scope.soundKey = function (soundKeyName) {
//                for (var soundKey in $scope.soundKeys) {
//                    if (soundKey.name === soundKeyName) {
//                        return soundKey;
//                    }
//                }
//            }
            console.log('$scope.soundKeys: ', $scope.soundKeys);
            $http.post('/solmik/strings-in-categories', {}).success(function (data) {
                $scope.stringsInCategories = data.result;

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

