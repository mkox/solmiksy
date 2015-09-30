define(["jquery", "underscore", "angular", "cas/categoriesAndStrings", "solmiBasics"], function ($, _, ng, cas, sb) {
//define(function(require) {
//  var cas = require('cas/categoriesAndStrings');
    cas.directive('formNewString', function () {

        return {
            templateUrl: sb.bPath + 'partials/stringNew.html',
            scope: {
//                stringsInCategories: '=stringsInCategories'
            },
            controller: function ($scope, $element, $attrs) {
                $scope.string = {};
                var standardSoundKeyForNewString = JSON.parse('{"name": "C"}');
                $scope.string.soundKey = standardSoundKeyForNewString;
                var categoriesForNewScope = [];
//                categoriesForNewScope.push($scope.stringsInCategories[$attrs.categoryId]);
console.log('cas-formNewString-directive $attrs.category: ', $attrs.category);
                categoriesForNewScope.push($attrs.category);
                $scope.string.baseScale = 4;
                $scope.string.categories = categoriesForNewScope;
            }

        };
    });

});

