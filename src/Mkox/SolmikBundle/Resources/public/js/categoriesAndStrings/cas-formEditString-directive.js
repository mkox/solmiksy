define(["jquery", "underscore", "angular", "cas/categoriesAndStrings", "solmiBasics"], function ($, _, ng, cas, sb) {
//define(function(require) {
//  var cas = require('cas/categoriesAndStrings');
    cas.directive('formEditString', function () {

        return {
            templateUrl: sb.bPath + 'partials/stringEdit.html',
            scope: {
                category: '=',
                solmistring: '=',
                vm: '='
            },
            controller: function ($scope, $element, $attrs) {
                console.log('cas-formNewString-directive [$scope, $element, $attrs]: ', [$scope, $element, $attrs]);
                $scope.vm.removeOpenForms($scope.category.id);

                $scope.vm.string = $.extend(true, {}, $scope.solmistring);
                console.log('formEditString-D $scope.vm.string 1', $scope.vm.string);
                $scope.vm.string.soundKey = JSON.parse('{"name": "' + $scope.vm.string.soundKey + '"}');
                $scope.vm.originalCategoryIdsOfString = $scope.vm.string.categories;
                var categoriesForEditForm = [];
                for (var key in $scope.solmistring.categories) {
                    categoriesForEditForm.push(_.find($scope.vm.stringsInCategories, function (c) {
                        return c.id === $scope.solmistring.categories[key];
                    }));
                }
                $scope.vm.string.categories = categoriesForEditForm;
                console.log('formEditString-D $scope.vm.string 2', $scope.vm.string);
            }

        };
    });

});

