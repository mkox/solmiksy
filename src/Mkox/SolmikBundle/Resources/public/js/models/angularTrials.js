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

//    ngSolmik.filter('range', function () {
//        return function (input, min, max) {
//            min = parseInt(min); //Make string input int
//            max = parseInt(max);
//            for (var i = min; i <= max; i++)
//                input.push(i);
//            console.log('angularTrials.js filter range, input', input);
//            return input;
//        };
//    });

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
//                    console.log('ngModel.$formatters value', value);
                    var selectedKey = {};
                    selectedKey.name = value;
//                    console.log('ngModel.$formatters selectedKey', selectedKey);
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

    return ngSolmik.controller('test2Ctrl', ['$scope', '$http', '$compile', '$sce', function ($scope, $http, $compile, $sce) {
//    return ngSolmik.controller('test2Ctrl', function ($scope) {

            $http.get('/solmik/hello2/you').success(function (data) {
                $scope.name = data.name;
            });

            $http.post('/solmik/post', {"foo": "bar"}).success(function (data) {
                $scope.foo = data.name.foo;
            });

            $scope.loggedin = false;
            console.log('angularTrials.js #solmik-authenticated', $('#solmik-authenticated'));
            if ($('#solmik-authenticated').length) {
                $scope.loggedin = true;
            }
            $scope.path = {
                categoryNew: sb.bPath + 'partials/categoryNew.html',
                categoryDelete: sb.bPath + 'partials/categoryDelete.html',
                categoryEdit: sb.bPath + 'partials/categoryEdit.html'
            };
            $scope.showFormNewCategory = false;
            $scope.formNewCategory = function () {
                $scope.showFormNewCategory = true;
            };

            $scope.formDeleteCategory = function (event, category) {
                console.log('$scope.formDeleteCategory this', this);
                console.log('$scope.formDeleteCategory event', event);
                console.log('$scope.formDeleteCategory category', category);
                $scope.category = category;
                $(event.currentTarget).parents(".category").append($compile('<div ng-include="path.categoryDelete"></div>')($scope));

            };
//            $scope.deleteCategoryValue = 'start';
            $scope.deleteCategory = function (event, categoryId) {
                console.log('$scope.deleteCategory [event, categoryId]:', [event, categoryId]);
                if (event.target.defaultValue === 'Yes') {
                    $http.post('/solmik/category/delete?id=' + categoryId, {"del": event.target.defaultValue}).success(function (data) {
//                        console.log('$scope.deleteCategory success $scope.stringsInCategories 1: ', $scope.stringsInCategories);
                        for (var key in $scope.stringsInCategories) {
                            if ($scope.stringsInCategories[key].id === categoryId) {
                                $scope.stringsInCategories.splice(key, 1);
                                break;
                            }
                        }
//                        console.log('$scope.deleteCategory success $scope.stringsInCategories 2: ', $scope.stringsInCategories);
                    });
                } else {
                    $(event.currentTarget).parents(".delete-category").remove();
                }
            };
            $scope.formEditCategory = function (event, category) {
                console.log('$scope.formDeleteCategory this', this);
                console.log('$scope.formDeleteCategory event', event);
                console.log('$scope.formDeleteCategory category', category);
                $scope.category = category;
                $(event.currentTarget).parents(".category").append($compile('<div ng-include="path.categoryEdit"></div>')($scope));

            };
            $scope.editCategory = function (event, category) {
                console.log('$scope.editCategory [event, category]:', [event, category]);
                var category2 = $.extend(true, {}, category);
                delete category2.$$hashKey;
                delete category2.id;

                $http.post('/solmik/category/edit?id=' + category.id, {"solmik_category": category2})
                        .then(function (data) {
                            console.log('$scope.editCategory success $scope.stringsInCategories 1: ', $scope.stringsInCategories);
                            $(event.currentTarget).remove();
                        })
                        .catch(function (error) {
                            console.log('$scope.editCategory catch error: ', error);
                        });
            };

            $scope.soundKeysArray = sb.soundKeysArray;
            console.log('ngSolmik.controller $scope.soundKeysArray', $scope.soundKeysArray);

            $http.post('/solmik/strings-in-categories', {}).success(function (data) {
                $scope.stringsInCategories = data.result;

                console.log('$scope.stringsInCategories: ', $scope.stringsInCategories);
            });
//            $scope.getObjectData = function (theObject) {
//                theObject = JSON.parse(theObject);
//                var dataString = ""
//                for (z in theObject) {
//                    dataString += z;
//                    dataString += '<br>';
//                    dataString += theObject[z];
//                    dataString += '<br>';
//                }
//                return dataString
//            };
            var solmikCategory = {
                name: '',
                public: false,
                save: ''
            };
//            $scope.solmikCategory = solmikCategory;
            $scope.solmikCategory = $.extend(true, {}, solmikCategory);
            $scope.saveCategoryNew = function () {
                console.log('$scope.saveCategoryNew $scope.solmikCategory: ', $scope.solmikCategory);
                $http.post('/solmik/category/create', {"solmik_category": $scope.solmikCategory}).success(function (data) {
//                    $scope.stringsInCategories = data.result;
                    $scope.stringsInCategories.push(JSON.parse(data.category));
                    console.log('$scope.saveCategoryNew success JSON.parse(data.category): ', JSON.parse(data.category));
                    console.log('$scope.stringsInCategories: ', $scope.stringsInCategories);
                    console.log('saveCategoryNew -> solmikCategory: ', solmikCategory);
                    $scope.solmikCategory = $.extend(true, {}, solmikCategory);
                    $scope.showFormNewCategory = false;
                });
            };
        }]);
});

