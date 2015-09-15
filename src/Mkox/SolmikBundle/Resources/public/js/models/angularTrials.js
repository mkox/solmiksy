define(["jquery", "underscore", "angular", "ngSolmik", "solmiBasics"], function ($, _, ng, ngSolmik, sb) {

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

        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {

                ngModel.$formatters.push(function (value) {
//                    console.log('ngModel.$formatters value', value);
                    var selectedKey = {};
                    selectedKey.name = value;
//                    console.log('ngModel.$formatters selectedKey', selectedKey);
                    return selectedKey;
                });

            }
        };
    });

    return ngSolmik.controller('test2Ctrl', ['$scope', '$rootScope', '$http', '$compile', '$sce', '$log', function ($scope, $rootScope, $http, $compile, $sce, $log) {

//            $http.get('/solmik/hello2/you').success(function (data) {
//                $scope.name = data.name;
//            });
//
//            $http.post('/solmik/post', {"foo": "bar"}).success(function (data) {
//                $scope.foo = data.name.foo;
//            });

            $scope.loggedin = false;
            $log.debug('angularTrials.js #solmik-authenticated', $('#solmik-authenticated'));
            if ($('#solmik-authenticated').length) {
                $scope.loggedin = true;
            }
            $scope.path = {
                categoryNew: sb.bPath + 'partials/categoryNew.html',
                categoryDelete: sb.bPath + 'partials/categoryDelete.html',
                categoryEdit: sb.bPath + 'partials/categoryEdit.html',
                stringNew: sb.bPath + 'partials/stringNew.html',
                stringDelete: sb.bPath + 'partials/stringDelete.html',
                stringEdit: sb.bPath + 'partials/stringEdit.html'
            };
            $scope.showFormNewCategory = false;
            $scope.formNewCategory = function () {
                $scope.showFormNewCategory = true;
            };

            $scope.formDeleteCategory = function (event, category) {
                removeOpenForms();
                $log.debug('$scope.formDeleteCategory this', this);
                $log.debug('$scope.formDeleteCategory event', event);
                $log.debug('$scope.formDeleteCategory category', category);
                $scope.category = category;
                $(event.currentTarget).parents(".category").append($compile('<div ng-include="path.categoryDelete"></div>')($scope));

            };

            $scope.deleteCategory = function (event, categoryId) {
                $log.debug('$scope.deleteCategory [event, categoryId]:', [event, categoryId]);
                if (event.target.defaultValue === 'Yes') {
                    $http.post('/solmik/category/delete?id=' + categoryId, {"del": event.target.defaultValue}).success(function (data) {
//                        $log.debug('$scope.deleteCategory success $scope.stringsInCategories 1: ', $scope.stringsInCategories);
                        for (var key in $scope.stringsInCategories) {
                            if ($scope.stringsInCategories[key].id === categoryId) {
                                $scope.stringsInCategories.splice(key, 1);
                                break;
                            }
                        }
//                        $log.debug('$scope.deleteCategory success $scope.stringsInCategories 2: ', $scope.stringsInCategories);
                    });
                } else {
                    $(event.currentTarget).parents(".delete-category").remove();
                }
            };
            $scope.formEditCategory = function (event, category) {
                removeOpenForms();
                $log.debug('$scope.formDeleteCategory this', this);
                $log.debug('$scope.formDeleteCategory event', event);
                $log.debug('$scope.formDeleteCategory category', category);
                $scope.category = category;
                $(event.currentTarget).parents(".category").append($compile('<div ng-include="path.categoryEdit"></div>')($scope));

            };
            $scope.editCategory = function (event, category) {
                $log.debug('$scope.editCategory [event, category]:', [event, category]);
                var category2 = $.extend(true, {}, category);
                delete category2.$$hashKey;
                delete category2.id;

                $http.post('/solmik/category/edit?id=' + category.id, {"solmik_category": category2})
                        .then(function (data) {
                            $log.debug('$scope.editCategory success $scope.stringsInCategories 1: ', $scope.stringsInCategories);
                            $(event.currentTarget).remove();
                        })
                        .catch(function (error) {
                            console.log('$scope.editCategory catch error: ', error);
                        });
            };

            $scope.formNewString = function (event, category) {
                removeOpenForms();

                $scope.string = {};
                var standardSoundKeyForNewString = JSON.parse('{"name": "C"}');
                $scope.string.soundKey = standardSoundKeyForNewString;
                var categoriesForNewScope = [];
                categoriesForNewScope.push(category);
                $scope.string.baseScale = 4;
                $scope.string.categories = categoriesForNewScope;
                $scope.category = category;
                $(event.currentTarget).parents(".category").append($compile('<div ng-include="path.stringNew"></div>')($scope));

            };

            $scope.saveNewString = function (event, category) {
                $log.debug('$scope.saveNewString [event, category, $scope.string]: ', [event, category, $scope.string]);
                event.preventDefault();
                var string2 = $.extend(true, {}, $scope.string);
                string2.soundKey = $scope.string.soundKey.name;
                var selectedCategories = string2.categories;
                string2.categories = [];
                for (var key in selectedCategories) {
                    string2.categories.push(selectedCategories[key].id);
                }
                $log.debug('$scope.saveNewString $scope.solmikCategory: ', $scope.solmikCategory);
                $http.post('/solmik/string/create?category_id=' + category.id, {"solmik_solmistring": string2})
                        .then(function (data) {
                            $log.debug('$scope.saveNewString catch then data: ', data);
                            for (var i = 0; i < string2.categories.length; i++) {
                                for (var key in $scope.stringsInCategories) {
                                    if ($scope.stringsInCategories[key].id === string2.categories[i]) {
                                        $scope.stringsInCategories[key].solmistrings.push(string2);
                                        break;
                                    }
                                }

                            }
                            $(event.target).remove();
                        })
                        .catch(function (error) {
                            console.log('$scope.saveNewString catch error: ', error);
                        });
            };

            $scope.formEditString = function (event, solmistring) {
                removeOpenForms();
                $log.debug('$scope.formEditString event', event);
                $scope.string = $.extend(true, {}, solmistring);
                $log.debug('$scope.formEditString $scope.string 1', $scope.string);
                $scope.string.soundKey = JSON.parse('{"name": "' + $scope.string.soundKey + '"}');
                $scope.originalCategoryIdsOfString = $scope.string.categories;
                var categoriesForEditForm = [];
                for (var key in solmistring.categories) {
                    categoriesForEditForm.push(_.find($scope.stringsInCategories, function (c) {
                        return c.id === solmistring.categories[key];
                    }));
                }
                $scope.string.categories = categoriesForEditForm;
                $log.debug('$scope.formEditString $scope.string 2', $scope.string);

                $(event.currentTarget).parents(".solmistring").append($compile('<div ng-include="path.stringEdit"></div>')($scope));

            };

            $scope.saveEditString = function (event) {
                $log.debug('$scope.saveEditString [event, $scope.string]: ', [event, $scope.string]);
                event.preventDefault();
                $scope.string.soundKey = $scope.string.soundKey.name;
                var selectedCategories = $scope.string.categories;
                $scope.string.categories = [];
                for (var key in selectedCategories) {
                    $scope.string.categories.push(selectedCategories[key].id);
                }
                var deletedCategories = _.difference($scope.originalCategoryIdsOfString, $scope.string.categories);
                $log.debug('$scope.saveEditString $scope.string: ', $scope.string);
                var string2 = $.extend(true, {}, $scope.string);
                if (string2.$$hashKey) {
                    delete string2.$$hashKey;
                }
                delete string2.id;
                $http.post('/solmik/string/edit?id=' + $scope.string.id, {"solmik_solmistring": string2})
                        .then(function (data) {
                            $log.debug('$scope.saveEditString post then data: ', data);
                            for (var i = 0; i < $scope.string.categories.length; i++) {
                                for (var key in $scope.stringsInCategories) {
                                    if ($scope.stringsInCategories[key].id === $scope.string.categories[i]) {
                                        $log.debug('$scope.saveEditString post then $scope.stringsInCategories[key].id: ', $scope.stringsInCategories[key].id);
                                        if ($scope.stringsInCategories[key].solmistrings) {
                                            var solmistringFound = false;
                                            for (var keyS in $scope.stringsInCategories[key].solmistrings) {
                                                $log.debug('$scope.saveEditString post then [$scope.stringsInCategories[key].solmistrings[keyS].id, $scope.string.id]: ', [$scope.stringsInCategories[key].solmistrings[keyS].id, $scope.string.id]);
                                                $log.debug('$scope.saveEditString post then $scope.stringsInCategories[key].solmistrings[keyS].id 2: ', $scope.stringsInCategories[key].solmistrings[keyS].id);
                                                if ($scope.stringsInCategories[key].solmistrings[keyS].id === $scope.string.id) {
                                                    $scope.stringsInCategories[key].solmistrings[keyS] = $scope.string;
                                                    solmistringFound = true;
                                                    break;
                                                }
                                            }
                                            if (!solmistringFound) {
                                                $scope.stringsInCategories[key].solmistrings.push($scope.string);
                                            }
                                        } else {
                                            $log.debug('No solmistring in category before.');
                                            $scope.stringsInCategories[key].solmistrings.push($scope.string);
                                        }
                                    }
                                }

                            }
                            if (deletedCategories.length > 0) {
                                $log.debug('$scope.saveEditString post then deletedCategories: ', deletedCategories);
                                for (var i = 0; i < deletedCategories.length; i++) {
                                    var selectedCategory = _.find($scope.stringsInCategories, function (c) {
                                        return c.id === deletedCategories[i];
                                    });
//                                    $log.debug('$scope.saveEditString post then selectedCategory: ', selectedCategory);
                                    for (var key in selectedCategory.solmistrings) {
//                                        $log.debug('$scope.saveEditString post then, loop selectedCategory.solmistrings');
                                        if (selectedCategory.solmistrings[key].id === $scope.string.id) {
                                            selectedCategory.solmistrings.splice(key, 1);
                                            break;
                                        }
                                    }
                                }
                            }
                            $(event.target).remove();
                        })
                        .catch(function (error) {
                            console.log('$scope.saveEditString catch error: ', error);
                        });
            };

            $scope.formDeleteString = function (event, solmistring) {
                removeOpenForms();
                $log.debug('$scope.formDeleteString this', this);
                $log.debug('$scope.formDeleteString event', event);
                $log.debug('$scope.formDeleteString solmistring', solmistring);
                $scope.string = solmistring;
                $(event.currentTarget).parents(".solmistring").append($compile('<div ng-include="path.stringDelete"></div>')($scope));

            };

            $scope.deleteString = function (event, stringId) {
                $log.debug('$scope.deleteString [event, categoryId]:', [event, stringId]);
                if (event.target.defaultValue === 'Yes') {
                    $http.post('/solmik/string/delete?id=' + stringId, {"del": event.target.defaultValue}).success(function (data) {
//                        $log.debug('$scope.deleteCategory success $scope.stringsInCategories 1: ', $scope.stringsInCategories);
                        for (var key in $scope.stringsInCategories) {
                            if ($.inArray($scope.stringsInCategories[key].id, $scope.string.categories)) {
                                for (var keyS in $scope.stringsInCategories[key].solmistrings) {
                                    if ($scope.stringsInCategories[key].solmistrings[keyS].id === $scope.string.id) {
                                        $scope.stringsInCategories[key].solmistrings.splice(keyS, 1);
                                        break;
                                    }
                                }
                            }
                        }
//                        $log.debug('$scope.deleteCategory success $scope.stringsInCategories 2: ', $scope.stringsInCategories);
                    });
                } else {
                    $(event.currentTarget).parents(".delete-string").remove();
                }
            };

            $scope.soundKeysArray = sb.soundKeysArray;
            $log.debug('ngSolmik.controller $scope.soundKeysArray', $scope.soundKeysArray);

            $http.post('/solmik/strings-in-categories', {}).success(function (data) {
                $scope.stringsInCategories = data.result;

                $log.debug('$scope.stringsInCategories nach post: ', $scope.stringsInCategories);
            });

            var solmikCategory = {
                name: '',
                public: false,
                save: ''
            };
            $scope.solmikCategory = $.extend(true, {}, solmikCategory);
            $scope.saveCategoryNew = function () {
                $log.debug('$scope.saveCategoryNew $scope.solmikCategory: ', $scope.solmikCategory);
                $http.post('/solmik/category/create', {"solmik_category": $scope.solmikCategory}).success(function (data) {

                    $scope.stringsInCategories.push(JSON.parse(data.category));
                    $log.debug('$scope.saveCategoryNew success JSON.parse(data.category): ', JSON.parse(data.category));
                    $log.debug('$scope.stringsInCategories: ', $scope.stringsInCategories);
                    $log.debug('saveCategoryNew -> solmikCategory: ', solmikCategory);
                    $scope.solmikCategory = $.extend(true, {}, solmikCategory);
                    $scope.showFormNewCategory = false;
                });
            };
            var removeOpenForms = function(){
                $('.remove-open-form').remove();
                $scope.solmikCategory = $.extend(true, {}, solmikCategory);
                $scope.showFormNewCategory = false;
            };
        }]);
});

