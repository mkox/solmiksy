define(["jquery", "underscore", "solmiBasics"], function ($, _, sb) {

    var categoriesAndStringsVM = function ($http, $log) {

        var that = this;

//            $http.get('/solmik/hello2/you').success(function (data) {
//                $scope.name = data.name;
//            });
//
//            $http.post('/solmik/post', {"foo": "bar"}).success(function (data) {
//                $scope.foo = data.name.foo;
//            });

        this.loggedin = false;
        $log.debug('categoriesAndStringsVM() #solmik-authenticated', $('#solmik-authenticated'));
        if ($('#solmik-authenticated').length) {
            this.loggedin = true;
        }
        this.path = {
            categoryNew: sb.bPath + 'partials/categoryNew.html',
            categoryDelete: sb.bPath + 'partials/categoryDelete.html',
            categoryEdit: sb.bPath + 'partials/categoryEdit.html',
            stringNew: sb.bPath + 'partials/stringNew.html',
            stringDelete: sb.bPath + 'partials/stringDelete.html',
            stringEdit: sb.bPath + 'partials/stringEdit.html'
        };
        this.showFormNewCategory = false;
        this.formNewCategory = function () {
            this.removeOpenForms();
            that.showFormNewCategory = true;
        };

        this.deleteCategory = function (event, categoryId) {
            $log.debug('this.deleteCategory [event, categoryId]:', [event, categoryId]);
            if (event.target.defaultValue === 'Yes') {
                $http.post('/solmik/category/delete?id=' + categoryId, {"del": event.target.defaultValue}).success(function (data) {
//                        $log.debug('this.deleteCategory success that.stringsInCategories 1: ', that.stringsInCategories);
                    for (var key in that.stringsInCategories) {
                        if (that.stringsInCategories[key].id === categoryId) {
                            that.stringsInCategories.splice(key, 1);
                            break;
                        }
                    }
//                        $log.debug('this.deleteCategory success that.stringsInCategories 2: ', that.stringsInCategories);
                });
            } else {
                that.stateCategory[categoryId] = '';
            }
        };
        this.editCategory = function (event, category) {
            $log.debug('this.editCategory [event, category]:', [event, category]);
            var category2 = $.extend(true, {}, category);
            delete category2.$$hashKey;
            delete category2.id;

            $http.post('/solmik/category/edit?id=' + category.id, {"solmik_category": category2})
                    .then(function (data) {
                        $log.debug('this.editCategory success that.stringsInCategories 1: ', that.stringsInCategories);
//                        $log.debug('this.editCategory success event.currentTarget: ', event.currentTarget);
                        that.stateCategory[category.id] = '';

                    })
                    .catch(function (error) {
                        console.log('this.editCategory catch error: ', error);
                    });
        };

        this.saveNewString = function (event, category) {
            $log.debug('this.saveNewString [event, category, that.string]: ', [event, category, that.string]);
            event.preventDefault();
            var string2 = $.extend(true, {}, that.string);
            string2.soundKey = that.string.soundKey.name;
            var selectedCategories = string2.categories;
            string2.categories = [];
            for (var key in selectedCategories) {
                string2.categories.push(selectedCategories[key].id);
            }
            $log.debug('this.saveNewString that.solmikCategory: ', that.solmikCategory);
            $http.post('/solmik/string/create?category_id=' + category.id, {"solmik_solmistring": string2})
                    .then(function (backData) {
                        $log.debug('this.saveNewString catch then backData: ', backData);
                        string2.id = backData.data.solmistring.id;
                        for (var i = 0; i < string2.categories.length; i++) {
                            for (var key in that.stringsInCategories) {
                                if (that.stringsInCategories[key].id === string2.categories[i]) {
                                    that.stringsInCategories[key].solmistrings.push(string2);
                                    break;
                                }
                            }

                        }
                        that.stateCategory[category.id] = '';
                    })
                    .catch(function (error) {
                        console.log('this.saveNewString catch error: ', error);
                    });
        };

        this.saveEditString = function (event) {
            $log.debug('this.saveEditString [event, that.string]: ', [event, that.string]);
            event.preventDefault();
            that.string.soundKey = that.string.soundKey.name;
            var selectedCategories = that.string.categories;
            that.string.categories = [];
            for (var key in selectedCategories) {
                that.string.categories.push(selectedCategories[key].id);
            }
            var deletedCategories = _.difference(that.originalCategoryIdsOfString, that.string.categories);
            $log.debug('this.saveEditString that.string: ', that.string);


            var string2 = $.extend(true, {}, that.string);
            if (string2.$$hashKey) {
                delete string2.$$hashKey;
            }
            delete string2.id;
            $log.debug('this.saveEditString [that.string.id, string2]', [that.string.id, string2]);
            $http.post('/solmik/string/edit?id=' + that.string.id, {"solmik_solmistring": string2})
                    .then(function (data) {
                        $log.debug('this.saveEditString post then data: ', data);
                        for (var i = 0; i < that.string.categories.length; i++) {
                            for (var key in that.stringsInCategories) {
                                if (that.stringsInCategories[key].id === that.string.categories[i]) {
                                    $log.debug('this.saveEditString post then that.stringsInCategories[key].id: ', that.stringsInCategories[key].id);
                                    if (that.stringsInCategories[key].solmistrings) {
                                        var solmistringFound = false;
                                        for (var keyS in that.stringsInCategories[key].solmistrings) {
                                            if (that.stringsInCategories[key].solmistrings[keyS].id === that.string.id) {
                                                that.stringsInCategories[key].solmistrings[keyS] = that.string;
                                                solmistringFound = true;
                                                break;
                                            }
                                        }
                                        if (!solmistringFound) {
                                            that.stringsInCategories[key].solmistrings.push(that.string);
                                        }
                                    } else {
                                        $log.debug('No solmistring in category before.');
                                        that.stringsInCategories[key].solmistrings.push(that.string);
                                    }
                                }
                            }

                        }
                        if (deletedCategories.length > 0) {
                            $log.debug('this.saveEditString post then deletedCategories: ', deletedCategories);
                            for (var i = 0; i < deletedCategories.length; i++) {
                                var selectedCategory = _.find(that.stringsInCategories, function (c) {
                                    return c.id === deletedCategories[i];
                                });
//                                    $log.debug('this.saveEditString post then selectedCategory: ', selectedCategory);
                                for (var key in selectedCategory.solmistrings) {
//                                        $log.debug('this.saveEditString post then, loop selectedCategory.solmistrings');
                                    if (selectedCategory.solmistrings[key].id === that.string.id) {
                                        selectedCategory.solmistrings.splice(key, 1);
                                        break;
                                    }
                                }
                            }
                        }
                        that.stateSolmistring[that.solmikCategory.id][that.string.id] = '';
                    })
                    .catch(function (error) {
                        console.log('this.saveEditString catch error: ', error);
                    });
        };

        this.deleteString = function (event, stringId) {
            $log.debug('this.deleteString [event, categoryId]:', [event, stringId]);
            if (event.target.defaultValue === 'Yes') {
                $log.debug('this.deleteString then that.stringsInCategories 1: ', that.stringsInCategories);
                $http.post('/solmik/string/delete?id=' + stringId, {"del": event.target.defaultValue})
                        .then(function (data) {
                            for (var key in that.stringsInCategories) {
                                if ($.inArray(that.stringsInCategories[key].id, that.string.categories) > -1) {
                                    for (var keyS in that.stringsInCategories[key].solmistrings) {
                                        if (that.stringsInCategories[key].solmistrings[keyS].id === that.string.id) {
                                            that.stringsInCategories[key].solmistrings.splice(keyS, 1);
                                            break;
                                        }
                                    }
                                }
                            }
//                        $log.debug('this.deleteString success that.stringsInCategories 2: ', that.stringsInCategories);
                        })
                        .catch(function (error) {
                            console.log('this.deleteString catch error: ', error);
                        });
            } else {
//                $(event.currentTarget).parents(".delete-string").remove();
                that.stateSolmistring[that.solmikCategory.id][stringId] = '';
            }
        };

        this.soundKeysArray = sb.soundKeysArray;
        $log.debug('categoriesAndStringsVM() that.soundKeysArray', this.soundKeysArray);

        $http.post('/solmik/strings-in-categories', {}).success(function (data) {
            $log.debug('$http.post /solmik/strings-in-categories data nach post : ', data);

            // temporary solution:
            var stringsInCat = data.result;
            for (var i = 0; i < stringsInCat.length; i++) {
                for (var j = 0; j < stringsInCat[i].solmistrings.length; j++) {
                    for (var k = 0; k < stringsInCat[i].solmistrings[j].categories.length; k++) {
                        if (typeof stringsInCat[i].solmistrings[j].categories[k] === 'object') {
                            stringsInCat[i].solmistrings[j].categories[k] = stringsInCat[i].solmistrings[j].categories[k].id;
                        }
                    }
                }
            }

//                that.stringsInCategories = data.result;
            that.stringsInCategories = stringsInCat;

            $log.debug('that.stringsInCategories nach post: ', that.stringsInCategories);
        });

        var solmikCategory = {
            name: '',
            public: false,
            save: ''
        };
        this.solmikCategory = $.extend(true, {}, solmikCategory);
        this.saveCategoryNew = function () {
            $log.debug('this.saveCategoryNew that.solmikCategory: ', that.solmikCategory);
            $http.post('/solmik/category/create', {"solmik_category": that.solmikCategory}).success(function (data) {

                that.stringsInCategories.push(JSON.parse(data.category));
                $log.debug('that.saveCategoryNew success JSON.parse(data.category): ', JSON.parse(data.category));
                $log.debug('that.stringsInCategories: ', that.stringsInCategories);
                $log.debug('saveCategoryNew -> solmikCategory: ', solmikCategory);
                that.solmikCategory = $.extend(true, {}, solmikCategory);
                that.showFormNewCategory = false;
            });
        };
        this.stateCategory = {};
        this.setStateCategory = function (categoryId, state) {
            $log.debug('this.setStateCategory [categoryId, state]', [categoryId, state]);
            that.stateCategory[categoryId] = state;
            $log.debug('this.setStateCategory that.stateCategory', that.stateCategory);
        };
        this.stateSolmistring = {};
        this.setStateSolmistring = function (categoryId, solmistringId, state) {
            that.stateSolmistring[categoryId] = {};
            that.stateSolmistring[categoryId][solmistringId] = state;
            that.stateCategory[categoryId] = '';
            $log.debug('this.setStateSolmistring that.stateSolmistring', that.stateSolmistring);
        };

        this.removeOpenForms = function (categoryId, solmistringId) {
            closeOpenCategoryForms(categoryId);
            closeOpenSolmistringForms(solmistringId);

            that.solmikCategory = $.extend(true, {}, solmikCategory);
            that.showFormNewCategory = false;
        };

        var closeOpenCategoryForms = function (categoryId) {
            if (Object.keys(that.stateCategory).length > 0) {
                for (var catId in that.stateCategory) {
                    if (categoryId && parseInt(catId) === categoryId) { //don't care about solmistringId here, see in this.setStateSolmistring: "that.stateCategory[categoryId] = '';"
                        continue;
                    } else {
                        that.stateCategory[catId] = '';
                    }
                }
            }
        };

        var closeOpenSolmistringForms = function (solmistringId) {
            for (var catId in that.stateSolmistring) {
                for (var stringId in that.stateSolmistring[catId]) {
                    if (solmistringId && parseInt(stringId) === solmistringId) {
                        continue;
                    }
                    that.stateSolmistring[catId][stringId] = '';
                }
            }
        };

    };

    return {
        categoriesAndStringsVM: categoriesAndStringsVM
    };
});

