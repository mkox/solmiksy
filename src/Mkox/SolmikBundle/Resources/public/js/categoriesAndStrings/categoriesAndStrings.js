//define(["jquery", "underscore", "solmiBasics", "angular", "uiRouter"], function ($, _, sb, angular) {
////define(["require", "jquery", "underscore", "solmiBasics", "angular", "uiRouter"], function (require, $, _, sb, angular) {
//define(["require", "jquery", "underscore", "solmiBasics", "angular", "uiRouter"], function ($, _, sb, angular, uiRouter, require) {
//define(["require", "jquery", "underscore", "solmiBasics", "angular", "uiRouter", "cas/cas-formEditCategory-directive2c"], function (require, $, _, sb, angular) {
//define(["jquery", "underscore", "solmiBasics", "angular", "uiRouter", "cas/cas-formEditCategory-directive2c"], function ($, _, sb, angular) {
define(["jquery", "underscore", "solmiBasics", "angular", "uiRouter"], function ($, _, sb, angular) {

    var app = angular.module('categoriesAndStrings', ['ui.router'], ['$httpProvider', function ($httpProvider)
        {

            // Use x-www-form-urlencoded Content-Type
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

            // Override $http service's default transformRequest
            $httpProvider.defaults.transformRequest = [function (data)
                {
                    /**
                     * The workhorse; converts an object to x-www-form-urlencoded serialization.
                     * @param {Object} obj
                     * @return {String}
                     */
                    var param = function (obj)
                    {
                        var query = '';
                        var name, value, fullSubName, subName, subValue, innerObj, i;

                        for (name in obj)
                        {
                            value = obj[name];

                            if (value instanceof Array)
                            {
                                for (i = 0; i < value.length; ++i)
                                {
                                    subValue = value[i];
                                    fullSubName = name + '[' + i + ']';
                                    innerObj = {};
                                    innerObj[fullSubName] = subValue;
                                    query += param(innerObj) + '&';
                                }
                            }
                            else if (value instanceof Object)
                            {
                                for (subName in value)
                                {
                                    subValue = value[subName];
                                    fullSubName = name + '[' + subName + ']';
                                    innerObj = {};
                                    innerObj[fullSubName] = subValue;
                                    query += param(innerObj) + '&';
                                }
                            }
                            else if (value !== undefined && value !== null)
                            {
                                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                            }
                        }

                        return query.length ? query.substr(0, query.length - 1) : query;
                    };

                    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
                }];
        }]);

//    app.config(['$httpProvider', '$sceProvider', function ($httpProvider, $sceProvider) {
    app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$sceProvider', '$logProvider', function ($httpProvider, $stateProvider, $urlRouterProvider, $sceProvider, $logProvider) {
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
//            $sceProvider.enabled(false);  // Does not work.
            $logProvider.debugEnabled(false);

//            $stateProvider.state('categoryDelete', {
//                url: '/category/delete/:cid',
//                templateUrl: sb.bPath + 'partials/categoryDelete.html',
//                controller: function($scope, $stateParams, $compile){
//                    console.log('$stateProvider categoryDelete controller [$scope, $stateParams]', [$scope, $stateParams]);
//                    $('.cat-and-strings-' + $stateParams.cid + ' .category').append($compile('<div ui-view></div>')($scope));
//                    $scope.category = {};
//                    $scope.category.id = $stateParams.cid;
//                }
//            });
        }]);
//    app.directive('formEditCategory2c', require('cas/cas-formEditCategory-directive2c'));

    return app;

});
